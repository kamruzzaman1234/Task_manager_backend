const express = require("express");
const { registerUser, loginUser, getProfileUser, updateProfileUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfileUser);
router.put('/profile', protect, updateProfileUser)

module.exports = router;