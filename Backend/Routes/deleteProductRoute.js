const express = require("express");
const router = express.Router();

const { deleteProduct } = require("../Controllers/addNewProduct")

router.delete("/delete-product/:productId", deleteProduct);

module.exports = router;