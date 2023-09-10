import expressAsyncHandler from "express-async-handler";
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import axios from "axios";
import {
   createRepo,
   deleteRepo,
   addCollaborator,
   removeCollaborator,
   fetchFiles,
   createFile,
   deleteFile,
   updateFile,
 } from "./githubController.js";

// @desc Create a new project
// @route POST /api/projects/
// @access Public
const createProject = expressAsyncHandler(async (req, res) => {
  const { name, description, createdBy, members } = req.body;
  console.log(name)
  console.log(description)
  console.log(createdBy)
  console.log(members)
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
      });

    // Call the createRepo function without passing res
    const repoResponse = await createRepo(name, description); // Pass name and description directly to createRepo

    if (members && members.length > 0) {
      for (const memberId of members) {
        

        if (!project.members.includes(memberId)) {
          const collaborator = await User.findById(memberId)
            project.members.push(memberId);
            addCollaborator(name, collaborator.username)
            
            
        }
      }
    }
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
 
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Now, you can access the username of the authenticated user
  const authenticatedUsername = req.user.username;
  const authenticatedId = req.user._id;
  
  const myProjects = []
  const myProjectsForTeams = []
  for (const project of projects) {
    if (project.githubRepository) {
      
       const githubUrl = project.githubRepository;
       const urlParts = githubUrl.split('/'); // Split the URL by '/'
      // // The owner is the second part of the URL (index 1)
       const owner = urlParts[3]; // Assuming the URL structure is github.com/owner/repo

      // // Assuming you have the 'username' available from somewhere
       const username = authenticatedUsername; // Replace with your actual 'username'
       
      // // Compare the 'owner' with 'username'
       if (owner === username) {
         myProjects.push(project);
       }
    }
    for(const member of project.members) {
        
      const string1 = member.toString();
      const string2 = authenticatedId.toString();

      if(string1 === string2) {
        myProjectsForTeams.push(project)
      }

    }
  }
  myProjects.push(...myProjectsForTeams);

  //console.log(myProjects)
  //console.log(myProjectsForTeams)

  if (projects) {
    res.json(myProjects);
  } else {
    res.status(500).json({ error: 'error not found projects' });
  }
});


// @desc Get a single project by ID
// @route GET /api/projects/:id
// @access Public
const getProject = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId)
     .populate('createdBy', 'name')
     .populate('members', 'name'); // Populate the 'members' field with user information
      const githubUrl = project.githubRepository;
      console.log('|')
      console.log('|')
      console.log('|')
      console.log(project.createdBy.name)
      console.log('|')
      console.log('|')
      const urlParts = githubUrl.split('/'); // Split the URL by '/'
       // // The owner is the second part of the URL (index 1)
        const owner = urlParts[3];
        const user = await User.findOne({ username: owner });
        // console.log(owner)
        // console.log(user.username)
        // console.log(user.token)
    //  console.log(owner)
    //  console.log(owner)
    //  console.log(owner)
    //  console.log(owner)
  if (project) {
    const {
      files,
      pushEventsWithCommits,
      branches,
      auther
    } = await fetchFiles(project.name,user.username,user.token);

    const createrCommit = await User.findOne({username:auther})
    const Auther = createrCommit.name
    console.log("*")
    console.log("*")
    console.log("*")
    console.log(createrCommit.name)
    console.log("*")

    console.log("*")
    console.log("*")
    if (typeof files === 'undefined' || files === '0') {
      // No content in the repository

      res.json({
        project: {
          id: project._id,
          name: project.name,
          createBy: req.user.name,
          members: project.members.map(member => ({
            id: member._id,
            name: member.name // Return user name along with member id
          }))
        },
        message: 'No content in the repository',
      });
    } else {
      const fileNames = files
        .filter(file => file.path)
        .map(file => file.path.split('/').pop());
      console.log(project.name);
      console.log(req.user.name);
      console.log(project.name);
      console.log(Auther)
      console.log(branches)
      
      const projectInfo = {
        project: {
          id: project._id,
          name: project.name,
          createBy: req.user.name,
          members: project.members.map(member => ({
            id: member._id,
            name: member.name // Return user name along with member id
          }))
        },
        files: fileNames,
        events: pushEventsWithCommits,
        branches,
        Auther
      };

      res.json({
        projectInfo
      });
    }
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
  const 
  { name,
    description,
    membersToAdd, 
    membersToRemove, 
    createdFile, 
    newFileContent, 
    commitMessage,
    deletedFile,
    updatedFile
  } = req.body;

  const project = await Project.findById(projectId);
  
  if (project) {
    project.name = name;
    
    
    const user = await User.findById(project.createdBy)
    // TODO: fix the problem here, get the username from github not the database
    const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${process.env.tokenCreate}`,
    },
  });
    const owner = response.data.login;
    const repo = project.name
    // Convert members to an array, even if only one member is provided
    //const membersArray = Array.isArray(members) ? members.filter(member => member !== null) : [];
    // Check if membersArray is not empty
    if (membersToAdd && membersToAdd.length > 0) {
      for (const memberId of membersToAdd) {
        if (!project.members.includes(memberId)) {
          const collaborator = await User.findById(memberId)
            project.members.push(memberId);
            addCollaborator(repo, collaborator.username)
            
        }
      }
    }
    // Check if membersToRemove is an array and not empty
    if (membersToRemove && membersToRemove.length > 0) {
      // Remove members from the array
      for (const memberId of membersToRemove) {
        const index = project.members.indexOf(memberId);
        if (index !== -1) {

          const collaborator = await User.findById(memberId)
          console.log('exist',collaborator.name)
          removeCollaborator(repo, collaborator.name)
          project.members.splice(index, 1);
        } else {
          console.log('not exist')
        }
      }
    }

    //create file with content
    if (newFileContent && createdFile && commitMessage) {
      
      try {
        const createFileResponse = await createFile(repo, createdFile, newFileContent, commitMessage);
        console.log('File created:', createFileResponse);
      } catch (error) {
        console.error('Error creating file:', error);
        throw new error
      }
    }

    //create file without content
     if (createdFile && commitMessage) {
      
      try {
        const createFileResponse = await createFile(repo, createdFile,"" ,commitMessage);
        console.log('File created:', createFileResponse);
      } catch (error) {
        console.error('Error creating file:', error);
        throw new error
      }
    }
    //delete file
    if(deletedFile) {
      try {
        const deleteFileResponse = await deleteFile(repo, deletedFile)
        console.log('File deleted:', deleteFileResponse);
      } catch (error) {
        console.error('Error delete file:', error);
      }
    }

    //update file
    if(updatedFile) {
      try {
        const updateFileResponse = await updateFile(repo, updatedFile, newFileContent, commitMessage)
        console.log('File deleted:', updateFileResponse);
      } catch (error) {
        console.error('Error update file:', error);
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
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${process.env.tokenCreate}`,
    },
  });

  if (project) {
    // const user = await User.findById(project.createdBy)
    //  if (user) {
         await deleteRepo(project.name);
         const deleteProjectResult = await Project.findByIdAndDelete(projectId);
        if (deleteProjectResult) {
          res.json({ message: 'Project removed successfully' });
        } else {
          res.status(404);
          throw new Error('Project not found');
        }
    //  } 
    }
    
});


export {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getProject,
};
