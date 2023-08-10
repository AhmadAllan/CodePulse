import expressAsyncHandler from "express-async-handler";
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import {
   createRepo,
   deleteRepo
 } from "./githubController.js";//TODO:




// @desc Create a new project
// @route POST /api/projects/
// @access Public
const createProject = expressAsyncHandler(async (req, res) => {
  const { name, description, createdBy, members } = req.body;
  try {
    // Check if the user doesn't have the same name for a project twice
    const existingProject = await Project.findOne({ name, createdBy });
    if (existingProject) {
      return res.status(400).json({ error: 'A project with the same name already exists for this user' });
    }

    const project = await Project.create({
      name,
      description,
      createdBy,
      members,
    });

    // Call the createRepo function without passing res
    const repoResponse = await createRepo(name, description, createdBy); // Pass name and description directly to createRepo

    project.githubRepository = repoResponse.data.html_url;
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    // Handle any errors that might occur during project creation
    res.status(500).json({ message: 'An error occurred while creating the project' });
  }
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
  const { name, description, members, membersToRemove } = req.body;

  const project = await Project.findById(projectId);

  if (project) {
    project.name = name;
    project.description = description;

    // Convert members to an array, even if only one member is provided
    const membersArray = Array.isArray(members) ? members.filter(member => member !== null) : [];

    // Check if membersArray is not empty
    if (membersArray.length > 0) {
      // Add new members to the array if they are not already present
      for (const memberId of membersArray) {
        if (!project.members.includes(memberId)) {
          project.members.push(memberId);
        }
      }
    }

    // Check if membersToRemove is an array and not empty
    if (Array.isArray(membersToRemove) && membersToRemove.length > 0) {
      // Remove members from the array
      for (const memberId of membersToRemove) {
        const index = project.members.indexOf(memberId);
        if (index !== -1) {
          project.members.splice(index, 1);
        }
      }
    }

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
    const user = await User.findById(project.createdBy)
    if (user) {
      try {
        await deleteRepo(user.name, project.name);
        const deleteProjectResult = await Project.findByIdAndDelete(projectId);
        if (deleteProjectResult) {
          res.json({ message: 'Project removed successfully' });
        } else {
          res.status(404);
          throw new Error('Project not found');
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
      }
    } else {
      res.status(404);
      throw new Error('User not found');
    }
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
