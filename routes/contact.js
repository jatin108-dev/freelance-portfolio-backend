const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // 🔥 verify first
    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Message 🚀",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // 🔥 timeout fix
    const send = transporter.sendMail(mailOptions);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 8000)
    );

    await Promise.race([send, timeout]);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("MAIL ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;