import mongoose from "mongoose";

const configureDB = async () => {
  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/task-app')
    console.log('DB connected successfully', db.connection.name);
  } catch(err) {
      console.log('Error connecting to DB');
  }
}

export default configureDB;