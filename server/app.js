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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: "*" }));

// app.get("/", (req, res) => {
//   res.json({ data: "Hello world" });
// });

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

  if (isUser)
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign(
    { user: { user } },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "3600m",
    }
  );

  res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

//Get user API
app.get("/get-user", authenticateToken, async (req, res) => {
  const user = req.user;
  // console.log(user);

  if (!user || !user._id) {
    return res
      .status(401)
      .json({ error: true, message: "Could not get the user" });
  }

  try {
    const theUser = await User.findOne({ _id: user._id });

    if (!theUser) {
      return res
        .status(401)
        .json({ error: true, message: "Could not get the user" });
    }

    return res.status(200).json({
      error: false,
      user: {
        fullName: theUser.fullName,
        email: theUser.email,
        _id: theUser._id,
        createdOn: theUser.createdOn,
      },
      message: "Retrieved user info successfully",
    });
  } catch (error) {
    console.error("Error retrieving user:", error.message);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Login API
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ error: true, message: "Email is required" });
  if (!password)
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });

  const userInfo = await User.findOne({ email });

  if (!userInfo)
    return res.status(400).json({ message: "Invalid credentials" });
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
  const user = req.user;

  // console.log("Received request:", { title, content, tags, user });

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

//Edit note API
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes made",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note)
      return res.status(400).json({
        error: true,
        message: "Note not found",
      });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error.message, error.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

//Get all notes API
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });
    // console.log("Sorted Notes:", notes);
    return res.status(200).json({
      error: false,
      notes,
      message: "Retrieved all notes successfully",
    });
  } catch (error) {
    console.error("Error getting all notes", error.message, error.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

//Delete note API
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const user = req.user;
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({ userId: user._id, _id: noteId });

    if (!note)
      return res.status(400).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ userId: user._id, _id: noteId });

    return res.status(200).json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error.message, error.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

//Pin notes API
app.put("/pin-note/:noteId", authenticateToken, async (req, res) => {
  const user = req.user;
  const { noteId } = req.params;
  const { isPinned } = req.body;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note)
      return res.status(400).json({
        error: true,
        message: "Note not found",
      });

    note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note pinned successfully",
    });
  } catch (error) {
    console.error("Error pinning note:", error.message, error.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

//Get pinned notes API
app.get("/get-pinned-notes", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const pinnedNotes = await Note.find({ userId, isPinned: true }).sort({
      createdOn: -1,
    });
    return res.status(200).json({
      error: false,
      notes: pinnedNotes,
      message: "Retrieved pinned notes successfully",
    });
  } catch (error) {
    console.error("Error getting pinned notes", error.message, error.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

//Search notes API
app.get("/search-notes/", authenticateToken, async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.status(200).json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

//Get tags API
app.get("/get-all-tags", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(userId);
    const notes = await Note.find({ userId });

    const allTags = notes.reduce((acc, note) => {
      note.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);

    res.json({ tags: allTags });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
