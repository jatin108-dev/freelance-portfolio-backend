const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  role: String,
  message: String,
  rating: Number, 
  rating: Number,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);