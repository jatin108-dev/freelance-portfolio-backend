require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const contactRoute = require("./routes/contact");
const reviewRoute = require("./routes/reviews");

const app = express();

app.use(cors({
  origin: "https://freelance-portfolio-khaki-omega.vercel.app/"
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

app.use("/api/contact", contactRoute);
app.use("/api/reviews", reviewRoute);

app.listen(5000, () => console.log("Server running on 5000"));