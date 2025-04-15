const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Add new task
router.post('/tasks', async (req, res) => {
  const { title, completed } = req.body;
  const task = new Task({ title, completed });

  try {
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save task' });
  }
});

// Delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Update task
router.put('/tasks/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

module.exports = router;
