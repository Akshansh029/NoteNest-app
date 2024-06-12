const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  isPinned: { type: Boolean, default: false },
  userId: { type: ObjectId, required: true, ref: "User" },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
