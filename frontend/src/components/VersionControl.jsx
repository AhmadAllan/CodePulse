import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const VersionControl = () => {
  const [projects] = useState([
    // Array of projects with their branches, pulls, and commits
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(1); // State to track the selected project
  const [expandedPulls, setExpandedPulls] = useState([]); // State to track expanded pulls
  const [expandedCommits, setExpandedCommits] = useState([]); // State to track expanded commits

  const handleProjectChange = (projectId) => {
    setSelectedProjectId(projectId); // Update the selected project
  };

  const handlePullToggle = (pullId) => {
    if (expandedPulls.includes(pullId)) {
      setExpandedPulls(expandedPulls.filter((id) => id !== pullId)); // Collapse the pull if it is already expanded
    } else {
      setExpandedPulls([...expandedPulls, pullId]); // Expand the pull if it is not expanded
    }
  };

  const handleCommitToggle = (commitId) => {
    if (expandedCommits.includes(commitId)) {
      setExpandedCommits(expandedCommits.filter((id) => id !== commitId)); // Collapse the commit if it is already expanded
    } else {
      setExpandedCommits([...expandedCommits, commitId]); // Expand the commit if it is not expanded
    }
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId); // Find the selected project

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
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
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-md p-6 ml-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {selectedProject ? selectedProject.name : 'Select a Project'}
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
              <h3 className="text-lg font-bold mb-2">Pulls</h3>
              {selectedProject.pulls.map((pull) => (
                <div key={pull.id} className="mb-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handlePullToggle(pull.id)}
                  >
                    <span>{pull.title}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`ml-2 ${
                        expandedPulls.includes(pull.id) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                  {expandedPulls.includes(pull.id) && (
                    <div className="pl-4">
                      <p>
                        Author: {pull.author}<br />
                        Date: {pull.date}<br />
                        File: {pull.file}
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
