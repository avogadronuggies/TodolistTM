// index.js
// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/todo");

mongoose.connect("mongodb://127.0.0.1:27017/test");

const app = express();
app.use(cors());
app.use(express.json());

// Add Todo
app.post("/add", (req, res) => {
  const { title } = req.body;
  TodoModel.create({ title })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

// Get Todos
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Update Completion Status
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  TodoModel.findByIdAndUpdate(id, { completed: completed }, { new: true })
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((error) => res.json(error));
});


// Delete Todo
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "Todo deleted successfully" }))
    .catch((error) => res.json(error));
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
