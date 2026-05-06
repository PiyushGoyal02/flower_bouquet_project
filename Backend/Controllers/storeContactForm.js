const UserModel = require("../Models/AuthSectionModel");

exports.storeContactForm = async (req, res) => {
  const { firstname, lastname, email, subject, message } = req.body;

  try {
    if (req.user.accountType !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can submit contact form."
      });
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.contactSubmissions.push({ firstname, lastname, email, subject, message });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });

  } catch (error) {
    console.error("Error storing contact form:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
