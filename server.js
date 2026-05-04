require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const contactRoute = require("./routes/contact");
const reviewRoute = require("./routes/reviews");

const app = express();

/* ===================== CORS (FINAL) ===================== */
// apni Vercel URL yahan rakho (NO trailing slash)
const allowedOrigin = "https://freelance-portfolio-khaki-omega.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

//  preflight (OPTIONS) handle
app.options("*", cors({ origin: allowedOrigin }));

/* ===================== MIDDLEWARE ===================== */
app.use(express.json());

/* ===================== DB CONNECT ===================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.error("Mongo Error:", err));

/* ===================== HEALTH ROUTE ===================== */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ===================== ROUTES ===================== */
app.use("/api/contact", contactRoute);
app.use("/api/reviews", reviewRoute);

/* ===================== PORT ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});