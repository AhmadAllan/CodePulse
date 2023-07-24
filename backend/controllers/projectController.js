import expressAsyncHandler from "express-async-handler";
import Project from '../models/projectModel.js';
import { mongo } from "mongoose";
import mongoose from "mongoose";

// @desc Create a new project
// @route POST /api/projects/
// @access Public
const createProject = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // TODO: check if the user doesn't have the same name for a project twice

  const project = await Project.create({
    name,
    description,
  });

  res.status(201).json(project);
});

// @desc Delete a project
// @route DELETE /api/projects/:id
// @access Public
const deleteProject = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

  if (project) {
    await project.remove();
    res.json({ message: 'Project removed successfully' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc Update a project
// @route PUT /api/projects/:id
// @access Public
const updateProject = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const { name, description } = req.body;

  const project = await Project.findById(projectId);

  if (project) {
    project.name = name;
    project.description = description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc Get all projects
// @route GET /api/projects/
// @access Public
const getAllProjects = expressAsyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

// @desc Get a single project by ID
// @route GET /api/projects/:id
// @access Public
const getProject = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);
  const project = await Project.findOne({_id: projectId});

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getProject,
};
