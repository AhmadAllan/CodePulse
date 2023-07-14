import { useState } from "react";

const ProjectPage = () => {
  // State variables
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", role: "owner" },
    { id: 2, name: "Project B", role: "leader" },
    { id: 3, name: "Project C", role: "member" },
  ]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");

  // Event handlers
  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleAddProject = () => {
    if (newProjectName.trim() !== "") {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        role: "owner",
      };

      setProjects([...projects, newProject]);
      setNewProjectName("");
    }
  };

  // Get the selected project based on the selectedProjectId
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <div className="flex bg-gray-100">
      {/* Project list sidebar */}
      <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">My Projects</h2>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Owner/Leader</h3>
          <ul>
            {projects
              .filter(
                (project) =>
                  project.role === "owner" || project.role === "leader"
              )
              .map((project) => (
                <li
                  key={project.id}
                  className={`mb-2 cursor-pointer ${
                    selectedProjectId === project.id
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }`}
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.name}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Member</h3>
          <ul>
            {projects
              .filter((project) => project.role === "member")
              .map((project) => (
                <li
                  key={project.id}
                  className={`mb-2 cursor-pointer ${
                    selectedProjectId === project.id
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }`}
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.name}
                </li>
              ))}
          </ul>
          <div className="mt-4">
            {/* Input for new project name */}
            <input
              type="text"
              placeholder="New Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
            {/* Button to add a new project */}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleAddProject}
            >
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Project content section */}
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
          {/* Display the selected project name */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {selectedProject ? selectedProject.name : "Select a Project"}
          </h1>
          <div className="grid grid-cols-2 gap-6">
            {/* Code Editor section */}
            <div className="bg-blue-500 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Code Editor</h2>
                <p className="text-sm">Write and edit code for the project.</p>
              </div>
              <button className="px-4 py-2 bg-blue-700 rounded-lg">
                Open Code Editor
              </button>
            </div>
            {/* Version Control section */}
            <div className="bg-green-500 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Version Control</h2>
                <p className="text-sm">
                  Manage project versions and collaborate on code.
                </p>
              </div>
              <button className="px-4 py-2 bg-green-700 rounded-lg">
                Open Version Control
              </button>
            </div>
            {/* Chat section */}
            <div className="bg-yellow-500 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Chat</h2>
                <p className="text-sm">
                  Communicate with project collaborators.
                </p>
              </div>
              <button className="px-4 py-2 bg-yellow-700 rounded-lg">
                Open Chat
              </button>
            </div>
            {/* Tasks section */}
            <div className="bg-purple-500 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Tasks</h2>
                <p className="text-sm">Manage and track project tasks.</p>
              </div>
              <button className="px-4 py-2 bg-purple-700 rounded-lg">
                Open Task Management
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
