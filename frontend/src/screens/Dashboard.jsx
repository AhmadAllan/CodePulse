import { useState, useEffect } from "react";
import { fetchAllProjects } from "../services/projectService";
import { fetchAllTasks } from "../services/taskService";
import ModalContainer from "../components/ModalContainer";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [object, setObject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const statusColorMap = {
    "to-do": "text-red-600",
    "in progress": "text-yellow-600",
    completed: "text-green-600",
    reviewed: "text-blue-600",
  };

  const openModal = (title, content, object) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
    setObject(object);
    console.log(object);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const projectsData = await fetchAllProjects();
        const tasksData = await fetchAllTasks();
        setProjects(projectsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    }
    fetchData();
  }, []);

  const projectsPopup = (
    <>
      <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
        {projects.map((project) => (
          <li
            key={project._id}
            className="py-2 px-4 my-2 rounded-lg bg-white hover:bg-gray-200 hover:cursor-pointer transition duration-300"
          >
            {project.name}
          </li>
        ))}
      </ul>
    </>
  );

  const tasksPopup = (
    <>
      <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="py-2 px-4 my-2 rounded-lg bg-white hover:bg-gray-200 hover:cursor-pointer transition duration-300 flex justify-between items-center"
          >
            <span className="text-lg font-semibold">{task.name}</span>
            <span className={`text-sm ${statusColorMap[task.status]}`}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </>
  );

  const collaboratorsPopup = (
    <>
      <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
        {projects.map((project) => (
          <li
            key={project._id}
            className="py-2 px-4 my-2 rounded-lg bg-white hover:bg-gray-200 hover:cursor-pointer transition duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{project.name}</span>
              <div className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2h8a2 2 0 012 2v2h2a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h2V5zm10 2H6a1 1 0 00-1 1v7a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1zm-4 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <ul className="ml-6 mt-2 list-disc">
              {project.members.map((member) => (
                <li key={member._id} className="text-sm text-gray-600">
                  {member.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {projects ? (
        <>
          <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-500 text-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Projects</h2>
                  <p className="text-sm">
                    Manage your projects and collaborate with your team.
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-blue-700 rounded-lg"
                  onClick={() => openModal("Projects", projectsPopup, projects)}
                >
                  View Projects
                </button>
              </div>
              <div className="bg-green-500 text-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Tasks</h2>
                  <p className="text-sm">
                    Stay organized with task management.
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-green-700 rounded-lg"
                  onClick={() => openModal("Tasks", tasksPopup, tasks)}
                >
                  View Tasks
                </button>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Collaborators</h2>
                  <p className="text-sm">
                    Manage your team members and their roles.
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-yellow-700 rounded-lg"
                  onClick={() =>
                    openModal("Collaborators", collaboratorsPopup, projects)
                  }
                >
                  View Collaborators
                </button>
              </div>
              <div className="bg-purple-500 text-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Notifications</h2>
                  <p className="text-sm">
                    Stay updated with project notifications.
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-purple-700 rounded-lg"
                  onClick={() => openModal("Notifications", modalContent2)}
                >
                  View Notifications
                </button>
              </div>
            </div>
          </div>
          <div>
            <ModalContainer
              isOpen={isModalOpen}
              onClose={closeModal}
              title={modalTitle}
              content={modalContent}
              object={object}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
