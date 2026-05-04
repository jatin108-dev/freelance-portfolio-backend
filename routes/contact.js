const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Request received:", name, email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // 🔥 remove verify (it causes hang sometimes)
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Mail sent successfully");

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ error: "Mail failed" });
  }
});

module.exports = router;