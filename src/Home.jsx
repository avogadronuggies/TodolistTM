import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);

  // Toggle the 'completed' status
  const handleDone = (id, completed) => {
    axios
      .patch(`http://localhost:3001/todos/${id}`, { completed: !completed }) // Toggle the `completed` status
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // Delete a task
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`) // Use correct backticks
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // Update state to remove deleted todo
      })
      .catch((err) => console.log(err));
  };

  // Fetch todos from the server
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <Create setTodos={setTodos} /> {/* Pass the setTodos function as prop */}
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="task">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleDone(todo._id, todo.completed)} // Call handleDone on checkbox change
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none", // Show line-through if completed
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
