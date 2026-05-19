import Task from '../models/task.js';
import errorFormatter from "../helpers/errorFormatter.js";

const listAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ count: tasks.length, data: tasks});
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong'});
  }
}

const postTask = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Data not provided' });
  }

  const { title, description, status, priority } = req.body;

  try {
    let task = new Task({ title, description, status, priority });

    task = await task.save();

    res.status(201).json({ message: 'Task created successfully', data: task });
  }
  catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json(errorFormatter(err.errors));
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task);
  } catch(err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid id format'});
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const updateTask = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Data not provided' });
  }

  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, priority }, { returnDocument: "after", runValidators: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json({ message: 'Task updated successfully', data: updatedTask });
  } catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json(errorFormatter(err.errors));
    } else if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid id format'});
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', data: deletedTask});
  } catch(err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid id format'});
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export default { listAllTasks, postTask, getTaskById, updateTask, deleteTask }

