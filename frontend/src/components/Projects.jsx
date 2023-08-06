import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useCreateProjectMutation,
  useGetAllProjectsMutation,
} from "../slices/projectApiSlice";

const Projects = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const { projectsData, isLoading, isSuccess } = useGetAllProjectsMutation();
  const [createProject] = useCreateProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      setProjects((prevProjects) => [...prevProjects, isSuccess]);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userInfo) {
      if (!isLoading) {
        setProjects(projectsData || []);
      }
    }
  }, [userInfo, isLoading, projectsData]);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleCreateProject = async () => {
    setIsCreatingProject(true);
    try {
      const data = {
        name: name,
        description: description,
        createdBy: userInfo._id,
        members,
      };

      await createProject(data);

      setShowCreateModal(false);
    } catch (error) {
      console.log(error);
    }
    setIsCreatingProject(false);
  };

  // TODO: the fetch code still does not work the useState project return null
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
                  project.createdBy === userInfo._id
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
              .filter((project) => project.createdBy != userInfo._id)
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
            {/* Button to open the create project modal */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowCreateModal(true)}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>

      {/* Project content section */}
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
          {/* Display the selected project name */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {selectedProjectId
              ? projects.find((project) => project.id === selectedProjectId)?.name
              : "Select a Project"}
          </h1>
          {/* ... Rest of the content sections ... */}
        </div>
      </div>

      {/* ... Create Project Modal ... */}
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
                <select
                  id="members"
                  multiple
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={members}
                  onChange={(e) =>
                    setMembers(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {/* ... Fetch and display available members here ... */}
                </select>
              </div>
              {/* ... Add more input fields for other project details as needed ... */}
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
                onClick={handleCreateProject}
                disabled={isCreatingProject}
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

export default Projects;
