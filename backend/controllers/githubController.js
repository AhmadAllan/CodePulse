import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { json } from 'express';
dotenv.config();

// Token user in Github
// let octokit
// let owner
async function getToken(token) {
  console.log('hi')
}
const octokit = new Octokit({
  auth: `token ${process.env.tokenCreate}`, // Replace accessToken with your actual access token
});
const userResponse = await octokit.users.getAuthenticated();
  const owner = userResponse.data.login;


// url: http://localhost:8000/api/github/repository/userName/repoName
async function getRepository(req, res) {
  const { repo } = req.query;


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
    //const { username } = req.params;
    
    try {
      const userResponse = await octokit.users.getByUsername({
        username:owner,
      })
      const reposResponse = await octokit.repos.listForUser({
        username:owner,
      })
      const activityResponse = await octokit.activity.listPublicEventsForUser({
        username:owner,
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
  async function createRepo(name, description) {
    try {
      
  
      const response = await octokit.repos.createForAuthenticatedUser({
        name, // Name of the repository (required)
        description, // Description of the repository
        owner,
        // TODO: Add other properties as needed
      });
  
      console.log('GitHub API response for createRepo:', response.data);
      const readmeContent = '# ' + name + '\n' + description;
    
    const readmeResponse = await octokit.repos.createOrUpdateFileContents({
      owner: owner,
      repo: name,
      path: 'README.md',
      message: 'Initial commit',
      content: Buffer.from(readmeContent).toString('base64'),
    });

      return response; // Return the response directly without using res
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while creating the GitHub repository');
    }
  }

  // url: http://localhost:8000/api/github/create-repo
  async function deleteRepo(repo) {
    //const { owner, repo } = req.params;
    try {
      
  
      // Delete the repository
      await octokit.repos.delete({
        owner,
        repo,
      });

      return json({
        owner,
        repo
      })
    } catch (error) {
      console.error('Error deleting repository', error);
      throw error
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
    async function addCollaborator(repo, username) {
      //const { owner, repo, username } = req.body;
      
    
      try {
        await octokit.repos.addCollaborator({
          owner,
          repo,
          username,
        });
    
        //res.json({ success: true });
        return {message: 'success full adding collaborater'}
      } catch (error) {
        console.log('not add coll')
        //res.status(error.status || 500).json({
          //message: error.message,
        //});
      }
    }
    
  
    async function removeCollaborator(req, res) {
      const {repo, username } = req.body;
      
    
      try {
        const response = await octokit.repos.removeCollaborator({
          owner,
          repo,
          username,
        });
    
        const collaboratorRemoved = response.status === 204; // 204 No Content indicates success
        res.json({ success: collaboratorRemoved });
      } catch (error) {
        console.error('Error removing collaborator:', error);
        throw new Error('Failed to remove collaborator from repository');
    
      }
    }
    
  
  // url: http://localhost:8000/api/github/fetch-file?owner=userName&repo=repoName&path=README.md
  async function fetchFile(req, res) {
    const { repo, path } = req.query;
  
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
  async function updateFile(repo, path, content, commitMessage) {
    //const { owner, repo, path, content, commitMessage } = req.body;
  
    try {
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
      //res.json({ success: true });
      return updateFileResponse
    } catch (error) {
      console.log('not updated file')
      throw new error
      // res.status(error.status || 500).json({
      //   message: error.message,
      // });
    }
  }
  
  async function createFile(repo, path, content, commitMessage) {
  //const { owner, repo, path, content, commitMessage } = req.body;

  try {
    const createFileResponse = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: commitMessage || 'Create file', // Commit message
      content: Buffer.from(content, 'utf-8').toString('base64'),
    });

    // Response indicating success
    //res.json({ success: true });
    return createFileResponse.data
  } catch (error) {
    console.log('Not create file:', error )
    // res.status(error.status || 500).json({
    //   message: error.message,
    // });
  }
}

  async function deleteFile(repo, path) {
    //const { owner, repo, path } = req.body;
    try {
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
      return deleteFileResponse
    } catch (error) {
      console.log('not deleted file')
      // res.status(error.response.status || 500).json({
      //   message: error.message,
      // });
    }
  }

  async function fetchFiles(repo) {
    //const {owner, repo} = req.query
    console.log(repo)
    console.log(owner)
    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
      })
      const activityResponse = await octokit.activity.listRepoEvents({
        owner,
        repo,
      });
      const branchesResponse = await octokit.repos.listBranches({
        owner,
        repo,
      });

      const files = response.data;
      const repoActivity = activityResponse.data;
      const pushEventsWithCommits = [];
      const branches = branchesResponse.data.map((branch) => branch.name);


      for (const event of activityResponse.data) {
        if (event.type === "PushEvent") {
          
          const eventType = event.type;
          const actor = event.actor.login;
          const eventMessage = event.payload.commits[0].message;
          const eventTime = new Date(event.created_at).toLocaleString();

          // Store the push event, commits, and commit messages in an array
          pushEventsWithCommits.push({
            eventType,
            actor,
            eventMessage,
            eventTime
          });
        }
      }
      
  
      return {
        files,
        pushEventsWithCommits,
        branches,
      };
  
    } catch (error) {
      console.error('Error fetching files:', error);

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
    fetchFiles,
    getToken
  };
  