const dotenv = require("dotenv").config();
const parser = require("parse-link-header");
const fetch = require("node-fetch");
const async = require("async");
const cache = require("memory-cache");

// Construct the API URL with the variables set in .env file.
const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
const API_URL = `https://${API_KEY}:${PASSWORD}@toolio-retail.myshopify.com/admin/api/2021-04/products.json?fields=id,title&limit=250`;

const getAllProducts = function () {
  let url = API_URL;
  let allProducts = { "products": [] };
  let nextPageExists = true;

  // Get all products from the Shopify API, page by page.
  // Implemented wrt the cursor-based pagination logic described in https://www.shopify.com/partners/blog/relative-pagination.
  return new Promise((resolve, reject) => {
    async.whilst(
      function (callback) {
        return callback(null, nextPageExists === true);
      },
      function (callback) {
        // If all products exist in the cache, return.
        if (cache.get("allProducts"))
        {
          resolve(cache.get("allProducts"));
          return;
        }

        fetch(url)
          .then(response => {            
            // Parse the link header of response to obtain the next page of products.
            const linkHeader = response.headers.get("link");
            const parsedHeader = parser(linkHeader);

            if (parsedHeader.next)
            {
              url = API_URL + "&page_info=" + parsedHeader.next.page_info;
            }
            else
            {
              nextPageExists = false;
            }
            
            // Returned value will be used in the next "then".
            return response.json();
          })
          .then(curProducts => {
            // Append products of the current page to all products.
            allProducts.products = [...allProducts.products, ...curProducts.products];
          })
          .catch((error) => {
            reject(error);
          });
          
        // Call fetch every 1000 msec.
        setTimeout(callback, 1000);
      },
      function (error) {
        if (error)
        {
          reject(error);
        }
        else
        {
          // Store all products in cache for 20 mins, since it is a costly operation.
          cache.put("allProducts", allProducts, 20 * 60000);
          resolve(allProducts);
        }
      }
    );
  }); 
};

const getProductsByTitle = (async (keyword) => {
  keyword = keyword.toLowerCase();

  try
  {
    const result = await getAllProducts();
    const matchingProducts = result.products.filter(product => (product.title.toLowerCase().includes(keyword)));
    //console.log(matchingProducts.length, "matching products have been found.");
    
    return matchingProducts;
  }
  catch (error)
  {
    console.log(error);
    return error;
  }
});

module.exports = {
  getAllProducts,
  getProductsByTitle,
};