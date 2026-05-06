const express = require("express");
const route = express.Router();

const { getAllProducts } = require("../Controllers/getAllproducts")

route.get("/get-all-products", getAllProducts);

module.exports = route;