// todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }, // New field for completion status
});

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;
