const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// GET all reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

// POST new review
router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json({ message: "Review added" });
});

module.exports = router;