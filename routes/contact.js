const express = require("express");
const router = express.Router();
const Contact = require("../models/Contacts");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔹 1. Save to DB
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    console.log("Saved to DB");

    // 🔹 2. Send Mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Message 🚀",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Mail sent");

    // 🔹 3. Response
    res.status(200).json({ success: true });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;