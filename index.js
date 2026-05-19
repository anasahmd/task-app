import express from "express";
import configureDB from "./config/db.js";
import Task from "./models/task.js";
import errorFormatter from "./helpers/errorFormatter.js";
<<<<<<< HEAD
import taskController from "./controllers/tasks.js";
import userController from "./controllers/users.js"
import dotenv from "dotenv";
import authenticateUser from "./middleware/authentication.js";
dotenv.config();
=======
import { listAllTasks } from "./controllers/tasks.js";
>>>>>>> 5cb72b0 (Up till May 14)
const PORT = 3535;

const app = express();
configureDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

<<<<<<< HEAD
app.get('/api/tasks', authenticateUser, taskController.listAllTasks);
app.post('/api/tasks', authenticateUser, taskController.postTask);
app.get('/api/tasks/:id', authenticateUser, taskController.getTaskById);
app.put('/api/tasks/:id', authenticateUser, taskController.updateTask);
app.delete('/api/tasks/:id', authenticateUser, taskController.deleteTask);

app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);
=======
app.get('/api/tasks', listAllTasks);

app.post('/api/tasks', async (req, res) => {
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
})

app.get('/api/tasks/:id', async (req, res) => {
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
})

app.put('/api/tasks/:id', async (req, res) => {
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
})

app.delete('/api/tasks/:id', async (req, res) => {
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
})
>>>>>>> 5cb72b0 (Up till May 14)

app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
})