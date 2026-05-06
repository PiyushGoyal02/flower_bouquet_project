const express = require("express");
const route = express.Router();

const { addProduct } = require("../Controllers/addNewProduct");
const upload = require("../MiddleWare/ClaudinaryMiddleware");

// Wrap multer to surface upload errors clearly
const handleUpload = (req, res, next) => {
  upload.array("productImages", 5)(req, res, (err) => {
    if (err) {
      console.log("Multer upload error:", err);
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
        error: err.message,
        code: err.code,
      });
    }
    next();
  });
};

route.post("/add", handleUpload, addProduct);

module.exports = route;
