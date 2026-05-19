import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ["Pending", "In Progress", "Completed"], 
      message: "{VALUE} status is not supported",
    },
    default: "Pending",
    trim: true
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: {
      values: ["Low", "Medium", "High"], 
      message: "{VALUE} status is not supported",
    },
    default: "Medium",
    trim: true
  }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema);

export default Task;