import { useState } from 'react';

const Dashboard = () => {
  const [activePopup, setActivePopup] = useState(null);

  const handlePopupOpen = (popup) => {
    setActivePopup(popup);
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-500 text-white rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Projects</h2>
              <p className="text-sm">Manage your projects and collaborate with your team.</p>
            </div>
            <button
              className="px-4 py-2 bg-blue-700 rounded-lg"
              onClick={() => handlePopupOpen('projects')}
            >
              View Projects
            </button>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Tasks</h2>
              <p className="text-sm">Stay organized with task management.</p>
            </div>
            <button
              className="px-4 py-2 bg-green-700 rounded-lg"
              onClick={() => handlePopupOpen('tasks')}
            >
              View Tasks
            </button>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Collaborators</h2>
              <p className="text-sm">Manage your team members and their roles.</p>
            </div>
            <button
              className="px-4 py-2 bg-yellow-700 rounded-lg"
              onClick={() => handlePopupOpen('collaborators')}
            >
              View Collaborators
            </button>
          </div>
          <div className="bg-purple-500 text-white rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm">Stay updated with project notifications.</p>
            </div>
            <button
              className="px-4 py-2 bg-purple-700 rounded-lg"
              onClick={() => handlePopupOpen('notifications')}
            >
              View Notifications
            </button>
          </div>
        </div>
      </div>
      {activePopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {activePopup === 'projects' && 'Projects Popup'}
              {activePopup === 'tasks' && 'Tasks Popup'}
              {activePopup === 'collaborators' && 'Collaborators Popup'}
              {activePopup === 'notifications' && 'Notifications Popup'}
            </h2>
            <p>This is the content of the {activePopup} popup.</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
              onClick={handlePopupClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
