import expressAsyncHandler from "express-async-handler";
import Project from '../models/projectModel.js';

// @desc Create a new project
// @route POST /api/projects/
// @access Public
const createProject = expressAsyncHandler(async (req, res) => {

  const { name, description, createdBy, members } = req.body;
  //check if the user doesn't have the same name for a project twice
  const existingProject = await Project.findOne({ name, createdBy });
  if (existingProject) {
    return res.status(400).json({ error: 'A project with the same name already exists for this user' });
  }
  const project = await Project.create({
    name,
    description,
    createdBy,
    members
  });
  res.status(201).json(project);
});


// @desc Get all projects
// @route GET /api/projects/
// @access Public
const getAllProjects = expressAsyncHandler(async (req, res) => {
  const projects = await Project.find({});
  if (projects) {
    res.json(projects);
  } else {
    res.status(500).json({ error: 'error not found projects' });
  }
});


// @desc Get a single project by ID
// @route GET /api/projects/:id
// @access Public
const getProject = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId).populate('createdBy', 'name');
  if (project) {
  
    res.json(project);
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
  const { name, description, members } = req.body;

  const project = await Project.findById(projectId);

  if (project) {
    project.name = name;
    project.description = description;
    //TODO: مشكله اضافه كل الاشخاص للامصفوفة
    project.members.push(members)

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
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


export {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getProject,
};
