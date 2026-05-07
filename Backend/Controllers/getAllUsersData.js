const UserModel = require("../Models/AuthSectionModel");

// Get All Users Data
exports.getAllUsersData = async (req, res) => {
  try {
    // Exclude admins; include legacy users that may not have accountType set
    const usersData = await UserModel
      .find({ accountType: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 });

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