const service = require("../services/products");

const getProducts = async (req, res, next) => {
  try {
    var keyword = req.query.title;

    if (keyword == null || keyword == "")
    {
      return res.status(200).send({ status: "success", msg: "Please enter a product title." });
    }
    else
    {
      // Title is provided, find the matching ones among all products and return them.
      keyword = keyword.toLowerCase();

      const matchingProducts = service.result.products.filter(product => (product.title.toLowerCase().includes(keyword)));
      console.log(matchingProducts.length, "matching products have been found.");

      if (matchingProducts.length < 1)
      {
        return res.status(200).send({ status: "success", msg: "No products found matching the provided title." });
      }

      res.json({ products: matchingProducts });

      // service.getAllProducts()
      //   .then(allProducts => {
      //     //console.log("Controller retrieved all products:\n", allProducts);
      //     const matchingProducts = allProducts.products.filter(product => (product.title.toLowerCase().includes(keyword)));
      //     console.log(matchingProducts.length, "matching products have been found.");
      //     //console.log("match:\n", matchingProducts);

      //     if (matchingProducts.length < 1)
      //     {
      //       return res.status(200).send({ status: "success", msg: "No products found matching the provided title." });
      //     }
    
      //     res.json({ products: matchingProducts });
      //   })
      //   .catch(error => console.log(error));
    }
  } catch (error) {
    next(error);
  } 
};

module.exports = {
 getProducts,
};