const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Email OTP Sender (Configure this with real credentials)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Register User & Send OTP
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    user = new User({ name, email, otp, otpExpires });

    await user.save();

    // Send OTP to email
    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP for account verification is: ${otp}`,
    });

    res.status(201).json({ message: "OTP sent to email. Verify to proceed." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Verify OTP and Activate User
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email }).select("+otp +otpExpires");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Account verified! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//logout user
// Logout User
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the token if stored in cookies
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Submit Support Ticket
exports.submitSupportTicket = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await transporter.sendMail({
      from: email,
      to: "coder46789@gmail.com",
      subject: `Support Request: ${subject}`,
      text: `From: ${name} \nEmail: ${email} \n\nMessage: ${message}`,
    });

    res.json({ message: "Support request submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
