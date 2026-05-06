const addProductModel = require("../Models/adminSideModel");
const cloudinary = require("../Config/ClaudinaryConfig");

// Helper: ek file buffer ko cloudinary par upload karta hai
// const uploadBufferToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "flower_bouquet_website", resource_type: "image" },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result.secure_url);
//       }
//     );
//     stream.end(buffer);
//   });
// };

exports.addProduct = async (req, res) => {
  try {
    const body = req.body || {};
    console.log("📦 Received body:", body);
    console.log("📁 Received files count:", (req.files || []).length);

    const { productName, descriptionText, category, originalPrice, discountPrice, productsquantity, deliveryTime, productHighlights, stockStatus, discountPercentage } = body;

    // Find which fields are missing
    const missing = [];
    if (!productName) missing.push("productName");
    if (!descriptionText) missing.push("descriptionText");
    if (!category) missing.push("category");
    if (!originalPrice) missing.push("originalPrice");
    if (!discountPrice) missing.push("discountPrice");
    if (!productsquantity) missing.push("productsquantity");
    if (!deliveryTime) missing.push("deliveryTime");
    if (!stockStatus) missing.push("stockStatus");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
        missingFields: missing,
        receivedKeys: Object.keys(body),
      });
    }

    // Image validation — min 1, max 5
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least 1 product image",
      });
    }

    if (req.files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "You can upload a maximum of 5 product images",
      });
    }

    // Sab files ko parallel me cloudinary par upload karo
    const imageUrls = await Promise.all(
      req.files.map((file) => uploadBufferToCloudinary(file.buffer))
    );

    // productHighlights aa sakta hai string (FormData) ya array — dono handle
    let highlights = productHighlights;
    if (typeof highlights === "string") {
      try {
        highlights = JSON.parse(highlights);
      } catch {
        highlights = [highlights];
      }
    }

    const newProduct = new addProductModel({
      productName,
      descriptionText,
      category,
      originalPrice,
      discountPrice,
      productsquantity,
      deliveryTime,
      productHighlights: highlights,
      stockStatus,
      productImages: imageUrls,
      discountPercentage,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    console.log("Error adding product:", error);
    console.log("Error message:", error.message);
    console.log("Error name:", error.name);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
      error: error.message,
      errorName: error.name,
    });
  }
};
