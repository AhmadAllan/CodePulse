import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../services/taskService";
import { useLocation } from "react-router-dom";
import { fetchProjectById } from "../services/projectService";
import Loader from "../components/Loader";

const TaskManagement = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy] = useState(userInfo._id);
  const [toUser, setToUser] = useState("");
  const [status, setStatus] = useState("to-do");
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);

  const taskStatusOptions = ["to-do", "in progress", "completed", "reviewed"];
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      console.log(location.state);
      try {
        const tasksData = await fetchAllTasks();
        const projectData = await fetchProjectById(location.state);
        setTasks(tasksData);
        setProject(projectData.projectInfo.project);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  const handleTaskSubmit = async (e) => {
    console.log(project);
    console.log(tasks);
    e.preventDefault();
    if (name.trim() === "") {
      return;
    }

    try {
      const response = await createTask({
        name,
        description,
        createdBy,
        toUser,
        status,
      });
      setTasks([...tasks, response]);
      setName("");
      setDescription("");
      setStatus("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {project ? (
        <>
          <div className="border-l-2 pl-3 border-gray-900 mb-4">
            <h1 className="text-3xl font-bold mb-4 underline">Task Management</h1>
            <div className="flex">
              <h3 className="text-2xl font-bold mb-4">Project name: &nbsp;</h3>
              <h3 className="text-2xl mb-4">{project.name}</h3>
            </div>
          </div>
          <form onSubmit={handleTaskSubmit} className="mb-4">
            <div className="my-2">
              <label htmlFor="taskName" className="block mb-1">
                Task
              </label>
              <input
                type="text"
                id="taskName"
                placeholder="Enter Task"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label htmlFor="taskDescription" className="block mb-1">
                Task Description
              </label>
              <textarea
                id="taskDescription"
                placeholder="Enter Task Description"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* <div className="my-2">
                <label htmlFor="status" className="block mb-1">
                  Task Status
                </label>
                <select
                  id="status"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {taskStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="my-2">
              <label htmlFor="members" className="text-lg block mb-1">
                To User:
              </label>
              <select
                id="members"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={toUser}
                onChange={(e) => setToUser(e.target.value)}
              >
                <option value="">Select User</option>
                {project.members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 focus:outline-none transition duration-300 ease-in-out"
            >
              Submit Comment
            </button>
          </form>
          <div>
            <h2 className="text-lg font-bold mb-2 mt-5">Task List</h2>
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <ul className="bg-gray-100 rounded-lg p-4">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="flex items-center justify-between mb-2 border border-gray-300 p-2 rounded"
                  >
                    <p>{task.name}</p>
                    <div>
                      {taskStatusOptions.map((statusOption) => (
                        <button
                          key={statusOption}
                          className={`py-1 px-2 rounded ${
                            task.status === statusOption
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-800"
                          }`}
                          style={{ marginRight: "0.5rem" }}
                          onClick={() =>
                            handleTaskStatusChange(task._id, statusOption)
                          }
                        >
                          {statusOption}
                        </button>
                      ))}
                      <button
                        onClick={() => handleTaskDelete(task._id)}
                        className="text-red-500 hover:text-red-600 ml-2 focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TaskManagement;
