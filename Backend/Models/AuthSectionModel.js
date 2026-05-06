const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    gender: {
      type: String
    },

    password: {
      type: String,
    },

    accountType: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    contactSubmissions: [
      {
        firstname: { type: String, required: true },
        lastname: { type: String },
        email: { type: String, required: true },
        subject: { type: String },
        message: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthModel", AuthSchema);