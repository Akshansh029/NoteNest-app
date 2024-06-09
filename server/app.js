require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const User = require("./models/user.model");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello world" });
});

// Create account API
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Fullname is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    console.log("User check:", isUser);
    return res.json({ error: true, message: "User already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "3600m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

//Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res.json({ error: true, message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "3600m",
    });

    return res.status(200).json({
      error: false,
      email,
      accessToken,
      message: "Login successful",
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
