const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const productsRouter = require("./routers/products");

app.get("/", (req, res) => {
  res.send("Welcome to the product search server for Toolio Shopify Store!");
});

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});