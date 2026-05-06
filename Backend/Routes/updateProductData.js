const express = require("express");
const router = express.Router();
const { updateProduct } = require("../Controllers/addNewProduct")

// Route to update product data
router.put("/update-product/:productId", updateProduct);

module.exports = router;