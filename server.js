require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const contactRoute = require("./routes/contact");
const reviewRoute = require("./routes/reviews");

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "https://freelance-portfolio-khaki-omega.vercel.app"
}));

app.use(express.json());

// ✅ DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// ✅ ROUTES
app.use("/api/contact", contactRoute);
app.use("/api/reviews", reviewRoute);

// ✅ PORT FIX (CRITICAL)
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});