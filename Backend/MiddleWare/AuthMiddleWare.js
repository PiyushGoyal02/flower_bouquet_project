const JWT = require("jsonwebtoken");
const AuthModel = require("../Models/AuthSectionModel");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing"
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await AuthModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    req.user = user; // consistent naming
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });
  }
};