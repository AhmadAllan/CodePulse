import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { fetchProjectById } from "../services/projectService";

const VersionControl = () => {
  
  const [projects] = useState([
    {
      id: 1,
      name: 'Project A',
      branches: ['main', 'feature-1', 'bugfix-1'],
      pushs: [
        { id: 1, title: 'Implement feature 1', author: 'John Doe', date: '2023-08-14', file: 'main.js' },
        { id: 2, title: 'Fix critical bug', author: 'Jane Smith', date: '2023-08-15', file: 'bugfix.js' },
      ],
      commits: [
        { id: 1, message: 'Initial commit', author: 'John Doe', date: '2023-08-10' },
        { id: 2, message: 'Implement feature 1', author: 'John Doe', date: '2023-08-12' },
        { id: 3, message: 'Fix bug in feature 1', author: 'John Doe', date: '2023-08-13' },
      ],
    },
    // Add more projects here
  ]);

  const location = useLocation();
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [expandedpushs, setExpandedpushs] = useState([]);
  const [expandedCommits, setExpandedCommits] = useState([]);
  const [project, setProject] = useState(null)

  useEffect(() => {
    async function fetchData() {
      console.log(location.state);
      try {
        const projectData = await fetchProjectById(location.state);
        setProject(projectData);
        console.log(project);
      } catch (error) {
        console.error("Error fetching Files:", error);
        throw error;
      }
    }
    fetchData();
  },[]);

  const handlepushToggle = (pushId) => {
    // Toggle the push's expanded state
    setExpandedpushs((prevExpandedpushs) =>
      prevExpandedpushs.includes(pushId)
        ? prevExpandedpushs.filter((id) => id !== pushId)
        : [...prevExpandedpushs, pushId]
    );
  };

  const handleCommitToggle = (commitId) => {
    // Toggle the commit's expanded state
    setExpandedCommits((prevExpandedCommits) =>
      prevExpandedCommits.includes(commitId)
        ? prevExpandedCommits.filter((id) => id !== commitId)
        : [...prevExpandedCommits, commitId]
    );
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  return (
    <div className="flex bg-gray-100">
      {/* <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={`mb-2 cursor-pointer ${
                selectedProjectId === project.id ? 'text-blue-500 font-semibold' : 'text-gray-800'
              }`}
              onClick={() => handleProjectChange(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          test
        </h1>
        {selectedProject && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Version Control</h2>
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold mb-2">Branches</h3>
              <ul>
                {selectedProject.branches.map((branch) => (
                  <li key={branch} className="mb-2">
                    {branch}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold mb-2">pushs</h3>
              {selectedProject.pushs.map((push) => (
                <div key={push.id} className="mb-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handlepushToggle(push.id)}
                  >
                    <span>{push.title}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`ml-2 ${
                        expandedpushs.includes(push.id) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                  {expandedpushs.includes(push.id) && (
                    <div className="pl-4">
                      <p>
                        Author: {push.author}<br />
                        Date: {push.date}<br />
                        File: {push.file}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold mb-2">Commits</h3>
              {selectedProject.commits.map((commit) => (
                <div key={commit.id} className="mb-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleCommitToggle(commit.id)}
                  >
                    <span>{commit.message}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`ml-2 ${
                        expandedCommits.includes(commit.id) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                  {expandedCommits.includes(commit.id) && (
                    <div className="pl-4">
                      <p>
                        Author: {commit.author}<br />
                        Date: {commit.date}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionControl;