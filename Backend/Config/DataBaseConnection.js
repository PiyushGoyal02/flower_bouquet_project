require("dotenv").config();
const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log("DB Connected Successfully ✅");
  } catch (error) {
    console.log("Database Not Connected ❌");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { DbConnect };