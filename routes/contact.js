const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Request received");

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("Saved to DB");

    // ❌ NO nodemailer for now

    return res.status(200).json({
      success: true,
      msg: "Saved successfully",
    });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;