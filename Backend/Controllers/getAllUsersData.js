const UserModel = require("../Models/AuthSectionModel");

// Get All Users Data
exports.getAllUsersData = async (req, res) => {
  try {
    const usersData = await UserModel.find({ accountType: 'user' }).select("username email gender")

    return res.status(200).json({
      success: true,
      count: usersData.length,
      users: usersData,
    });

  } catch (error) {
    console.error("Error fetching users data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users data",
    });
  }
};