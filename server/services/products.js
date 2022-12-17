const dotenv = require("dotenv").config();
const parser = require("parse-link-header");
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
const async = require("async");

// Construct the API URL with the variables set in .env file.
const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
const API_URL = `https://${API_KEY}:${PASSWORD}@toolio-retail.myshopify.com/admin/api/2021-04/products.json?fields=id,title&limit=250`;

const getAllProducts = function () {
  var nextPageExists = true;
  var url = API_URL;
  var allProducts = { "products": [] };

  // Get all products from the Shopify API, page by page.
  // Implemented wrt the cursor-based pagination logic described in https://www.shopify.com/partners/blog/relative-pagination.
  return new Promise((resolve, reject) => {
    async.whilst(
      function (callback) {
        return callback(null, nextPageExists);
      },
      function (callback) {
        // For each product in the current page, get id and title.
        fetch(url)
          .then(response => { 
            // Parse the link header of response to obtain the next page of products.
            const linkHeader = response.headers.get("link");
            const parsedHeader = parser(linkHeader);

            if (parsedHeader.next != null)
            {
              url = API_URL + "&page_info=" + parsedHeader.next.page_info;
              //console.log("next page url", url);
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
            //console.log(curProducts.products.length, "products have been fetched.");
          })
          .catch((error) => {
            reject(error);
          });
          
        // Call fetch every 1000 msec. 500/750msec results with duplicate calls, why?
        setTimeout(callback, 1000);
      },
      function (error) {
        if (error)
        {
          reject(error);
        }
        else
        {
          resolve(allProducts);
        }
      }
    );
  }); 
}

module.exports = {
  getAllProducts,
};