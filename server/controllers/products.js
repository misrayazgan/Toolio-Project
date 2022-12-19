const productsService = require("../services/products");

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
      const matchingProducts = await productsService.getProductsByTitle(keyword);
      
      if (matchingProducts.length < 1)
      {
        return res.status(200).send({ status: "success", msg: "No products found matching the provided title." });
      }

      res.json({ products: matchingProducts });
    }
  } catch (error) {
    next(error);
  } 
};

module.exports = {
 getProducts,
};