const express = require('express');
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Create a task (admin only)
router.post(
  '/',
  [
    auth,
    role(['admin']),
    [
      check('title', 'Title is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
      });

      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get tasks with pagination (admin and user)
router.get('/', [auth, role(['admin', 'user'])], async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .limit(req.query.limit || 10)
      .skip((req.query.page - 1) * (req.query.limit || 10));
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a task (admin only)
router.put('/:id', [auth, role(['admin'])], async (req, res) => {
  const { title, description, completed } = req.body;

  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (completed !== undefined) taskFields.completed = completed;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a task (admin only)
router.delete('/:id', [auth, role(['admin'])], async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
