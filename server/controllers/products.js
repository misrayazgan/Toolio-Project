const service = require("../services/products");

const getProducts = async (req, res, next) => {
  try {
    keyword = req.query.title;
    console.log("controllers query", req.query);
    console.log("controllers keyword", keyword);

    if (keyword == "" || keyword == null)
    {
      res.json("Please enter a product title.");
    }
    else
    {
      keyword = keyword.toLowerCase();
      let products = await service.getProducts();
      
      console.log("test", products);
      const matchingProducts = products.filter(product => (product.title.toLowerCase().includes(keyword)));
      console.log("match", matchingProducts);
      res.json({ data: matchingProducts });
    }
    //res.json({ data: await service.getProducts() });
  } catch (error) {
    console.error("ERROR:", error.message);   // TO DO: delete?
    next(error);
  } 
};

module.exports = {
 getProducts,
};