const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware

router.get("/", authMiddleware, getProfile); // Protected Route

module.exports = router;
