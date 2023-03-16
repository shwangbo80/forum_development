const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const categoryRoute = require("./routes/categoryRoute");

const port = process.env.PORT || 8800;

app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/category", categoryRoute);

app.listen(port, () => {
  console.log("Backend server is running at " + port);
});
