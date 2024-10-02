import React, { useState } from "react";
import axios from "axios";

function Create({ setTodos }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task) return; // Prevent adding empty tasks
    axios
      .post("http://localhost:3001/add", { title: task, completed: false }) // Add `completed: false` for new tasks
      .then((result) => {
        setTodos((prev) => [...prev, result.data]); // Update the todo list in state
        setTask(""); // Clear the input field after adding
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Add Task"
        value={task}
        onChange={(e) => setTask(e.target.value)} // Update state on input change
      />
      <button type="button" onClick={handleAdd}>
        ADD
      </button>
    </div>
  );
}

export default Create;
