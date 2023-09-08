import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../services/taskService";

const TaskManagement = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState(userInfo._id);
  const [toUser, setToUser] = useState(userInfo._id);
  const [status, setStatus] = useState("to-do");
  const [tasks, setTasks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const taskStatusOptions = ["to-do", "in progress", "completed"];

  useEffect(() => {
    async function fetchData() {
      try {
        const tasksData = await fetchAllTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  const handleTaskSubmit = async (e) => {
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
      setShowCreateModal(false); // Close the create modal
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
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
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
              {/* <div className="my-2">
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
              </div> */}
              <div className="my-2">
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
    </div>
  );
};

export default TaskManagement;
