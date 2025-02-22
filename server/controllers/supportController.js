const SupportTicket = require("../models/SupportTicket");
const nodemailer = require("nodemailer");

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submit Support Ticket
exports.submitSupportTicket = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Save to MongoDB
    const newTicket = new SupportTicket({ name, email, subject, message });
    await newTicket.save();

    // Send Email
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // Receiving Email
      subject: `Support Request: ${subject}`,
      text: `From: ${name} \nEmail: ${email} \n\nMessage: ${message}`,
    });

    res.json({ message: "✅ Support request submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};
