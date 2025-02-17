const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String }, // Only required after OTP verification
    otp: { type: String, select: false }, // OTP should not be retrieved by default
    otpExpires: { type: Date, select: false }, // Expiry time for OTP
    isVerified: { type: Boolean, default: false }, // Verification status
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
