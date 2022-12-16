// Construct the API URL with the variables set in .env file.
const dotenv = require("dotenv").config();
const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
const API_URL = `https://${API_KEY}:${PASSWORD}@toolio-retail.myshopify.com/admin/api/2021-04/products.json?`;

const fetch = require("node-fetch");

const getProducts = (async() => {
  const products = await fetch(API_URL).then(response => response.json());
  console.log(products);
  const neededData = products.products.map((product) => {
    // For each product, get id and title.
    const { id, title } = product;
    return { id, title };
  });
  console.log("neededData", neededData);
  return neededData;
});

module.exports = {
  getProducts,
};