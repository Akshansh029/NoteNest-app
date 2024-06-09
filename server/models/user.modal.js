const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: { type: Date, defualt: new Date().getTime() },
});

model.exports = mongoose.model("User", userSchema);
