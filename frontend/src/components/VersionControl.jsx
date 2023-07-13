import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const VersionControl = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Project A',
      branches: ['main', 'feature-branch'],
      pulls: [
        { id: 1, title: 'Pull 1', author: 'Author A', date: '2022-08-01', file: 'path/to/file1' },
        { id: 2, title: 'Pull 2', author: 'Author B', date: '2022-08-05', file: 'path/to/file2' },
      ],
      commits: [
        { id: 1, message: 'Initial commit', author: 'Author A', date: '2022-08-01' },
        { id: 2, message: 'Fix bug #123', author: 'Author B', date: '2022-08-05' },
      ],
    },
    {
      id: 2,
      name: 'Project B',
      branches: ['main', 'dev', 'bug-fix'],
      pulls: [
        { id: 3, title: 'Pull 3', author: 'Author C', date: '2022-08-10', file: 'path/to/file3' },
        { id: 4, title: 'Pull 4', author: 'Author D', date: '2022-08-15', file: 'path/to/file4' },
      ],
      commits: [
        { id: 3, message: 'Add new feature', author: 'Author C', date: '2022-08-10' },
        { id: 4, message: 'Refactor code', author: 'Author D', date: '2022-08-15' },
      ],
    },
    {
      id: 3,
      name: 'Project C',
      branches: ['main'],
      pulls: [
        { id: 5, title: 'Pull 5', author: 'Author E', date: '2022-08-20', file: 'path/to/file5' },
      ],
      commits: [
        { id: 5, message: 'Fix styling issues', author: 'Author E', date: '2022-08-20' },
      ],
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [expandedPulls, setExpandedPulls] = useState([]);
  const [expandedCommits, setExpandedCommits] = useState([]);

  const handleProjectChange = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handlePullToggle = (pullId) => {
    if (expandedPulls.includes(pullId)) {
      setExpandedPulls(expandedPulls.filter((id) => id !== pullId));
    } else {
      setExpandedPulls([...expandedPulls, pullId]);
    }
  };

  const handleCommitToggle = (commitId) => {
    if (expandedCommits.includes(commitId)) {
      setExpandedCommits(expandedCommits.filter((id) => id !== commitId));
    } else {
      setExpandedCommits([...expandedCommits, commitId]);
    }
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

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
