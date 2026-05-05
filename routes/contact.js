const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ 1. Save to DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("Saved to DB");

    // ✅ 2. Setup transporter (SMTP - more stable than service)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // ✅ 3. Mail content
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Message 🚀",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // ✅ 4. Send mail with timeout protection
    const sendMail = transporter.sendMail(mailOptions);

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Mail timeout")), 8000)
    );

    await Promise.race([sendMail, timeout]);

    console.log("Mail sent");

    // ✅ 5. Response
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("CONTACT ERROR:", err.message);

    return res.status(500).json({
      error: "Failed to process contact",
      details: err.message,
    });
  }
});

module.exports = router;