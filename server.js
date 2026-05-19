import express from "express";
import configureDB from "./config/db.js";
import { deleteTask, listAllTasks, listTask, postTask, updateTask } from "./controllers/tasks.js";
const PORT = 3535;

const app = express();
configureDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/api/tasks', listAllTasks);
app.post('/api/tasks', postTask);
app.get('/api/tasks/:id', getTaskById);
app.put('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);

app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
})