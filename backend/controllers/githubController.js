import axios from 'axios'
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { json } from 'express';
dotenv.config();

//Token user in Github
const accessToken = process.env.tokenCreate;

// url: http://localhost:8000/api/github/repository/userName/repoName
async function getRepository(req, res) {
  const { owner, repo } = req.params;

  const octokit = new Octokit({
    auth: `token ${accessToken}`, // Replace accessToken with your actual access token
  });

  try {
    const response = await octokit.repos.get({
      owner,
      repo,
    });

    const repositoryInfo = response.data;

    res.json(repositoryInfo);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
}

  
  // url: http://localhost:8000/api/github/user/userName
  // fetch information user {userInfo , repositories, activity}
  async function getUser(req, res) {
    const { username } = req.params;
    const octokit = new Octokit({
      auth: `token ${accessToken}`,
    });
    try {
      const userResponse = await octokit.users.getByUsername({
        username
      })
      const reposResponse = await octokit.repos.listForUser({
        username
      })
      const activityResponse = await octokit.activity.listPublicEventsForUser({
        username
      })

      const userInfo = userResponse.data;
      const userRepo = reposResponse.data;
      const userActivity = activityResponse.data;

      res.json({
        userInfo,
        userRepo,
        userActivity

      })
    } catch (error) {
      res.status(error.response.status || 500).json({
               message: error.message,
           });
    }
  }
  
  // url: http://localhost:8000/api/github/create-repo

  //TODO:(req,res)
  async function createRepo(name, description, createdBy) {
    try {
      const octokit = new Octokit({
        auth: `token ${accessToken}`,
      });
  
      const response = await octokit.repos.createForAuthenticatedUser({
        name, // Name of the repository (required)
        description, // Description of the repository
        createdBy,
        // TODO: Add other properties as needed
      });
  
      console.log('GitHub API response for createRepo:', response.data);
      return response; // Return the response directly without using res
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while creating the GitHub repository');
    }
  }

  // url: http://localhost:8000/api/github/create-repo
  async function deleteRepo(owner, repo) {
    //const { owner, repo } = req.params;
    try {
      const octokit = new Octokit({
        auth: `token ${accessToken}`,
      });
  
      // Delete the repository
      await octokit.repos.delete({
        owner,
        repo,
      });
  
    } catch (error) {
      throw new Error('Error deleting repository');
    }
  }
  
  
  
  // url: http://localhost:8000/api/github/add-collaborator
  /*
  {
  "owner": "JaafarAbdalmajeed",
  "repo": "myGit",
  "username": "AhmadAllan"
    }
  */
    async function addCollaborator(req, res) {
      const { owner, repo, username } = req.body;
    
      const octokit = new Octokit({
        auth: `token ${accessToken}`, // Replace accessToken with your actual access token
      });
    
      try {
        await octokit.repos.addCollaborator({
          owner,
          repo,
          username,
        });
    
        res.json({ success: true });
      } catch (error) {
        res.status(error.status || 500).json({
          message: error.message,
        });
      }
    }
    
  
    async function removeCollaborator(req, res) {
      const { owner, repo, username } = req.body;
    
      const octokit = new Octokit({
        auth: `token ${accessToken}`, // Replace accessToken with your actual access token
      });
    
      try {
        const response = await octokit.repos.removeCollaborator({
          owner,
          repo,
          username,
        });
    
        const collaboratorRemoved = response.status === 204; // 204 No Content indicates success
        res.json({ success: collaboratorRemoved });
      } catch (error) {
        res.status(error.status || 500).json({
          message: error.message,
        });
      }
    }
    
  
  // url: http://localhost:8000/api/github/fetch-file?owner=userName&repo=repoName&path=README.md
  async function fetchFile(req, res) {
    const { owner, repo, path } = req.query;
  
    const octokit = new Octokit({
      auth: `token ${accessToken}`, // Replace accessToken with your actual access token
    });
  
    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });
  
      const fileData = response.data;
  
      // Decode the base64 content of the file
      const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      
      res.send(fileContent);
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message,
      });
    }
  }



  async function updateFile(req, res) {
    const { owner, repo, path, content, commitMessage } = req.body;
  
    try {
      const octokit = new Octokit({
        auth: `token ${accessToken}`,
      });
  
      // Fetch the current file data
      const getFileResponse = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });
  
      const currentFileData = getFileResponse.data;
      const currentFileContent = Buffer.from(currentFileData.content, 'base64').toString('utf-8');
  
      // Create a new commit with updated content
      const updatedContent = Buffer.from(content, 'utf-8').toString('base64');
  
      const updateFileResponse = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: commitMessage || 'Update file', // Commit message
        content: updatedContent,
        sha: currentFileData.sha, // The SHA of the existing file
      });
  
      // Response indicating success
      res.json({ success: true });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message,
      });
    }
  }
  
  async function createFile(req, res) {
  const { owner, repo, path, content, commitMessage } = req.body;

  try {
    const octokit = new Octokit({
      auth: `token ${accessToken}`,
    });

    const createFileResponse = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: commitMessage || 'Create file', // Commit message
      content: Buffer.from(content, 'utf-8').toString('base64'),
    });

    // Response indicating success
    res.json({ success: true });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
}

  
  async function deleteFile(req, res) {
    const { owner, repo, path } = req.body;
  
    try {
      const octokit = new Octokit({
        auth: `token ${accessToken}`,
      });
  
      const getFileResponse = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });
  
      const currentFileData = getFileResponse.data;
  
      const deleteFileResponse = await octokit.repos.deleteFile({
        owner,
        repo,
        path,
        message: 'Delete file', // Commit message
        sha: currentFileData.sha, // The SHA of the existing file
      });
  
      // Return the deleteFileResponse in the JSON response
      res.json({ success: true });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.message,
      });
    }
  }
  


export {
    getRepository,
    getUser,
    createRepo,
    deleteRepo,
    addCollaborator,
    removeCollaborator,
    fetchFile,
    updateFile,
    createFile,
    deleteFile,
  };
  