const express = require("express");
const {
  registerUser,
  loginUser,
  getProfileUser,
  updateProfileUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfileUser);
router.put('/profile', protect, updateProfileUser);

router.post('/upload-image', upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file Uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
