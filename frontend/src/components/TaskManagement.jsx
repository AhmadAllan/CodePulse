import { useState, useEffect } from 'react';
import { useCreateTaskMutation, useGetAllTasksMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../slices/taskApiSlice';

const TaskManagement = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toUser, setToUser] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTaskForm, setNewTaskForm] = useState({
    name: '',
    description: '',
    status: 'to-do',
  });
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const createTaskMutation = useCreateTaskMutation();
  const getAllTasksMutation = useGetAllTasksMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const { data } = await getAllTasksMutation.mutateAsync();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchAllTasks();
  }, [getAllTasksMutation]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTaskForm({
      ...newTaskForm,
      [name]: value,
    });
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    if (newTaskForm.name.trim() === '') {
      return;
    }

    try {
      const { data } = await createTaskMutation.mutateAsync(newTaskForm);
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }

    setNewTaskForm({
      name: '',
      description: '',
      status: 'to-do',
    });
    setIsCreateTaskOpen(false);
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await updateTaskMutation.mutateAsync({
        taskId,
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === data.id ? data : task))
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const taskStatusOptions = ['to-do', 'in progress', 'completed'];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2 focus:outline-none"
        onClick={() => setShowCreateModal(true)}
      >
        Create Task
      </button>

      {/* ... Create Task Modal ... */}
      {showCreateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <form>
              <div className="my-2">
                <label htmlFor="taskName" className="block mb-1">
                  Task Name
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
                  Task Description
                </label>
                <textarea
                  id="taskDescription"
                  placeholder="Enter Project Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="user" className="block mb-1">
                  For user
                </label>
                <select
                  id="user"
                  multiple
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={toUser}
                  onChange={(e) =>
                    setToUser(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {/* ... Fetch and display available members here ... */}
                </select>
              </div>
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
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
                onClick={handleTaskSubmit}
                disabled={isCreateTaskOpen}
              >
                Create Task
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

      <div>
        <h2 className="text-lg font-bold mb-2">Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="bg-gray-100 rounded-lg p-4">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between mb-2 border border-gray-300 p-2 rounded">
                <p>{task.name}</p>
                <div>
                  {taskStatusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(task.id, status)}
                      className={`py-1 px-2 rounded ${
                        task.status === status ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                      }`}
                      style={{ marginRight: '0.5rem' }}
                    >
                      {status}
                    </button>
                  ))}
                  <button
                    onClick={() => handleTaskDelete(task.id)}
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
