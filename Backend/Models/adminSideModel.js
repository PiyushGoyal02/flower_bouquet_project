// models/ProductModel.js

const mongoose = require("mongoose");

const addProducts = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    descriptionText: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    productsquantity: {
      type: Number,
      required: true,
      default: 1,
    },

    productImages: [
      {
        type: String,
        required: true,
      },
    ],

    deliveryTime: {
      type: String,
      default: "4-5 Working Days",
    },

    productHighlights: [
      {
        type: String,
      },
    ],

    ratings: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    stockStatus: {
      type: String,
      enum: ["In Stock", "Out Of Stock"],
      default: "In Stock",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("addProducts", addProducts);