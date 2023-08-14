import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAllProjects,
  fetchProjectById,
  createProject,
  updateProjectStatus,
  deleteProject,
} from "../services/projectService";

const ProjectPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState(userInfo._id);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await fetchAllProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    }
    fetchData();
  }, []);

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject({
        name,
        description,
        createdBy,
        members,
      });
      setProjects([...projects, response]);
      setShowCreateModal(false); // Close the create modal
      setName("");
      setDescription("");
      setMembers([]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleProjectDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // TODO: see if you need to add updateProject and fetchProjectById

  const selectedProject = projects.find(
    (project) => project._id === selectedProjectId
  );

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">My Projects</h2>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Owner/Leader</h3>
          <ul>
            {projects
              .filter((project) => project.createdBy === userInfo._id)
              .map((project) => (
                <li
                  key={project._id}
                  className={`mb-2 cursor-pointer ${
                    selectedProjectId === project._id
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }`}
                  onClick={() => handleProjectClick(project._id)}
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
              .filter((project) => project.createdBy !== userInfo._id)
              .map((project) => (
                <li
                  key={project._id}
                  className={`mb-2 cursor-pointer ${
                    selectedProjectId === project._id
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }`}
                  onClick={() => handleProjectClick(project._id)}
                >
                  {project.name}
                </li>
              ))}
          </ul>
          <div className="mt-4">
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowCreateModal(true)}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
          <div>
            {selectedProject ? (
                  <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{selectedProject.name}</h1>
                    <button
                      onClick={() => handleProjectDelete(selectedProjectId)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
              ) : (
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Select a Project</h1>
              )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-500 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Code Editor</h2>
                <p className="text-sm">Write and edit code for the project.</p>
              </div>
              <button className="px-4 py-2 bg-blue-700 rounded-lg">
                Open Code Editor
              </button>
            </div>
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
            <div className="bg-purple-500 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Projects</h2>
                <p className="text-sm">Manage and track project projects.</p>
              </div>
              <button className="px-4 py-2 bg-purple-700 rounded-lg">
                Open Project Management
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Project creating model */}
      {showCreateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form>
              <div className="my-2">
                <label htmlFor="projectName" className="block mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  placeholder="Enter Project Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="projectDescription" className="block mb-1">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  placeholder="Enter Project Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="members" className="block mb-1">
                  Members
                </label>
                {/* TODO: see how you will handle members add */}
                <select
                  id="members"
                  multiple
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={members}
                >
                  {/* ... Fetch and display available members here ... */}
                </select>
              </div>
              {/* ... Add more input fields for other project details as needed ... */}
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
                onClick={handleCreateProject}
              >
                Create Project
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mt-3 ml-2"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
