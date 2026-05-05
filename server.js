require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const contactRoute = require("./routes/contact");
const reviewRoute = require("./routes/reviews");

const app = express();

// ✅ SIMPLE CORS
app.use(cors());

// ✅ JSON
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working");
});

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// ✅ ROUTES
app.use("/api/contact", contactRoute);
app.use("/api/reviews", reviewRoute);

// ✅ PORT
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});