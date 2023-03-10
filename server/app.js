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

if (process.env.NODE_ENV !== 'test')
{
  // listen causes problems with jest
  app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
  });
}
else
{
  module.exports = app;
}