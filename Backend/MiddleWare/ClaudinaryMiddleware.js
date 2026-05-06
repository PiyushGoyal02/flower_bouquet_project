const multer = require("multer");

// Memory storage — file buffers ko RAM me rakhta hai, phir hum manually Cloudinary par upload karenge
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png, webp, avif images are allowed"));
    }
  },
});

module.exports = upload;
