// const express = require("express");
// const router = express.Router();

// const { auth } = require("../Middlewares/AuthMiddleware");

// // ✅ Protected Homepage Route
// router.get("/homepage", auth, (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       message: "Welcome to Homepage 🚀",
//       user: req.user, // middleware se aaya user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// // ✅ Protected About Route
// router.get("/aboutsection", auth, (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       message: "Welcome to About Section 📘",
//       user: req.user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// module.exports = router;