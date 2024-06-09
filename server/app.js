require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// const jwt = require("jsonwebtoken");
// import { authenticateToken } from "./utilities";

app.use(express.json);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello world" });
});

//Create account

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
