const express = require("express");
const cors = require("cors");
const productsRouter = require("./routers/products");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the product search server for Toolio Shopify Store!");
});

app.use("/products", productsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`, new Date().toUTCString());
});