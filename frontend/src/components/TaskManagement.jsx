import { useState } from 'react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]); // State to store the tasks
  const [newTask, setNewTask] = useState(''); // State to store the input for adding new tasks

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim() === '') {
      return;
    }

    const task = {
      id: Math.random().toString(36).substr(2, 9),
      content: newTask,
      status: 'to-do',
    };

    setTasks([...tasks, task]); // Add the new task to the tasks array
    setNewTask(''); // Clear the input for adding new tasks
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Remove the task from the tasks array
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus }; // Update the status of the task
        }
        return task;
      })
    );
  };

  const taskStatusOptions = ['to-do', 'in progress', 'completed']; // Options for task status

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
      <form onSubmit={handleTaskSubmit} className="mb-4">
        <input
          type="text"
          name="task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter a new task..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2 focus:outline-none"
        >
          Add Task
        </button>
      </form>
      <div>
        <h2 className="text-lg font-bold mb-2">Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks found.</p> // Display a message if there are no tasks
        ) : (
          <ul className="bg-gray-100 rounded-lg p-4">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between mb-2 border border-gray-300 p-2 rounded">
                <p>{task.content}</p> {/*Display the task content */}
                <div>
                  {taskStatusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(task.id, status)}
                      className={`py-1 px-2 rounded ${
                        task.status === status ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                      }`}
                      style={{ marginRight: '0.5rem' }} // Added margin
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
