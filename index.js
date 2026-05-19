import express from "express";
import configureDB from "./config/db.js";
import taskController from "./controllers/tasks.js";
import userController from "./controllers/users.js"
import dotenv from "dotenv";
import authenticateUser from "./middleware/authentication.js";
dotenv.config();

const PORT = 3535;

const app = express();
configureDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/api/tasks', authenticateUser, taskController.listAllTasks);
app.post('/api/tasks', authenticateUser, taskController.postTask);
app.get('/api/tasks/:id', authenticateUser, taskController.getTaskById);
app.put('/api/tasks/:id', authenticateUser, taskController.updateTask);
app.delete('/api/tasks/:id', authenticateUser, taskController.deleteTask);

app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);


app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
})