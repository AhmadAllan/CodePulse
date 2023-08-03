import axios from 'axios'
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

//Token user in Github
const accessToken = process.env.tokenCreate;

// url: http://localhost:8000/api/github/repository/userName/repoName
async function getRepository(req, res) {
    const { owner, repo } = req.params;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const repositoryInfo = response.data;
      
      res.json(repositoryInfo);
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.message,
      });
    }
  }
  
  // url: http://localhost:8000/api/github/user/userName
  // fetch information user {userInfo , repositories, activity}
  async function getUser(req, res) {
    const { username } = req.params;
    const userApiUrl = `https://api.github.com/users/${username}`;
    const reposApiUrl = `https://api.github.com/users/${username}/repos`;
    const activityApiUrl = `https://api.github.com/users/${username}/events/public`;
  
    try {
      const [userResponse, reposResponse, activityResponse] = await Promise.all([
        axios.get(userApiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get(reposApiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get(activityApiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);
  
      const userInfo = userResponse.data;
      const repositories = reposResponse.data;
      const activity = activityResponse.data;
  
      res.json({
        userInfo,
        repositories,
        activity,
      });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.message,
      });
    }
  }
  
  // url: http://localhost:8000/api/github/create-repo

  //TODO:(req,res)
  async function createRepo(name, description) {
    //TODO: { name, description, isPrivate, has_issues, has_projects, has_wiki } = req.body;

    try {
        const octokit = new Octokit({
            auth: `token ${accessToken}`,
        });

        const response = await octokit.repos.createForAuthenticatedUser({
            name, // Name of the repository (required)
            description, // Description of the repository
            //TODO:
            // private: !!isPrivate, // Whether the repository is private (true/false)
            // has_issues: !!has_issues, // Enable or disable issues (true/false)
            // has_projects: !!has_projects, // Enable or disable projects (true/false)
            // has_wiki: !!has_wiki, // Enable or disable wiki (true/false)
        });

        console.log('GitHub API response for createrepo:', response.data); // Log the response data
        //TODO: res.json(response.data)
        return response;
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
  }

  // url: http://localhost:8000/api/github/create-repo
  async function deleteRepo(req, res) {
    const { owner, repo } = req.params;
    try {
      const octokit = new Octokit({
        auth: `token ${accessToken}`,
      });
  
      // Delete the repository
      await octokit.repos.delete({
        owner,
        repo,
      });
  
      // Return a success message
      res.json({ success: true, message: `Repository '${owner}/${repo}' has been deleted.` });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.message,
      });
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
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`;
  
    try {
      const response = await axios.put(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const collaboratorAdded = response.status === 204; // 204 No Content indicates success
      res.json({ success: collaboratorAdded });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.message,
      });
    }
  }
  
  async function removeCollaborator(req, res) {
    const { owner, repo, username } = req.body;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`;
  
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const collaboratorRemoved = response.status === 204; // 204 No Content indicates success
      res.json({ success: collaboratorRemoved });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.message,
      });
    }
  }
  
  // url: http://localhost:8000/api/github/fetch-file?owner=userName&repo=repoName&path=README.md
  async function fetchFile(req, res) {
    const { owner, repo, path } = req.query;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const fileData = response.data;
  
      // Decode the base64 content of the file
      const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');//toString('binery')
      //res.setHeader('Content-Type', 'application/pdf');
      res.send(fileContent);
    } catch (error) {
      res.status(error.response.status || 500).json({
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
      const currentFileContent = Buffer.from(currentFileData.content, 'base64').toString();
  
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
      res.status(error.response.status || 500).json({
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
      res.status(error.response.status || 500).json({
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
  