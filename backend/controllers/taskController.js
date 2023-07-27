import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

// function to create a new Task

const createTask = expressAsyncHandler(async (req, res) => {
  const { name, description, createdBy, toUser, status } = req.body;

  // Create a new Task instance
  const newTask = await Task.create({
    name,
    description,
    createdBy,
    toUser,
    status
  });
  res.status(201).json(newTask);
});

//get all Task
const getAllTasks = expressAsyncHandler(async (req, res) => {
  const Tasks = await Task.find();
  res.json(Tasks);
});

// get Tasks by project Id
const getTasksByProject = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const Tasks = await Task.find({ project: projectId }).populate(
    "createdBy",
    "username"
  ); // Populate author's username from the User model

  res.status(200).json(Tasks);
});

// get Tasks by Task Id
const getTaskById = expressAsyncHandler(async (req, res) => {
    const { TaskId } = req.params;
  const Tasks = await Task.findById(TaskId).populate(
    "createdBy",
    "username"
  ); // Populate author's username from the User model

  res.status(200).json(Tasks);
});

// Delete Task
const deleteTask = expressAsyncHandler(async (req, res) => {
  const { TaskId } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: TaskId });
  if (!deletedTask) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json({ message: "Task deleted successfully" });
});

// Update Task
const updateTask = expressAsyncHandler(async (req, res) => {
    const { TaskId } = req.params; // Assuming the TaskId is passed as a parameter
    const { description } = req.body;
    const { status } = req.body;
    
    const updatedTask = await Task.findOneAndUpdate(
      { _id: TaskId },
      { description },
      { status },
      { new: true }
    );
  
    if (!updatedTask) {
      res.status(404);
      throw new Error('Task not found');
    }
  
    res.status(200).json(updatedTask);
  });
  
export {
  createTask,
  getTasksByProject,
  getTaskById,
  getAllTasks,
  deleteTask,
  updateTask,
};
