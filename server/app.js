require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

const User = require("./models/user.model");
const Note = require("./models/note.model");
const { authenticateToken } = require("./utilities");

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ data: "Hello world" });
});

// Create account API
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName)
    return res
      .status(400)
      .json({ error: true, message: "Fullname is required" });
  if (!email)
    return res.status(400).json({ error: true, message: "Email is required" });
  if (!password)
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });

  const isUser = await User.findOne({ email });

  if (isUser) return res.json({ error: true, message: "User already exists" });

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "3600m",
  });

  res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ error: true, message: "Email is required" });
  if (!password)
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });

  const userInfo = await User.findOne({ email });

  if (!userInfo) return res.status(400).json({ message: "User not found" });
  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "3600m",
    });

    return res
      .status(200)
      .json({ error: false, email, accessToken, message: "Login successful" });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid credentials" });
  }
});

// Add note API
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  console.log("Received request:", { title, content, tags, user });

  if (!title)
    return res.status(400).json({ error: true, message: "Title is required" });
  if (!content)
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  if (!tags)
    return res.status(400).json({ error: true, message: "Tags are required" });

  try {
    const note = new Note({
      title,
      content,
      tags,
      userId: user._id,
    });

    await note.save();

    return res
      .status(200)
      .json({ error: false, message: "Note added successfully" });
  } catch (error) {
    console.error("Error adding note:", error.message, error.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Database connection and server startup
mongoose
  .connect(config.connectionString)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Database not connected, error:", error);
  });

module.exports = app;
