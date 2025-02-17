const express = require("express");
const { register, verifyOTP, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

// 🔒 Protected Route Example (Only accessible with valid JWT token)
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    userId: req.user,
  });
});

module.exports = router;
