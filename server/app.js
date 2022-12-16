const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const productsRouter = require("./routers/products");

app.get("/", (req, res) => {
  res.send("Welcome to the product search server for Toolio Shopify!");
});

// app.get("/products", async (req, res) => {
//   const keyword = req.query.title.toLowerCase();
//   console.log("app query", req.query);
//   console.log("app keyword", keyword);
//   if (keyword == "" || keyword == null)
//   {
//     res.send("Please enter a product title.");
//   }
//   else
//   {
//     // Title is provided
//     let allProducts = await getAllProducts();
//     //allProducts.map


//     res.send();

//   }
//   //const filteredProducts = 
// });

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});