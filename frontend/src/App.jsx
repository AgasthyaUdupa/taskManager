import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`); // Use environment variable for backend URL
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, { // Use environment variable
        title: newTask,
        completed: false,
      });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`); // Use environment variable
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="no-task">No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span>{task.title}</span>
              <span className="status">{task.completed ? '✅ Done' : '🕓 Pending'}</span>
              <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
