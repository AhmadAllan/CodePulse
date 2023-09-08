import { useState } from 'react';
import ModalContainer from '../components/ModalContainer';

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);


  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalContent2 = (
    <>
      <p>This is the second modal content.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </>
  );

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
              onClick={() => openModal('Projects', modalContent2)}
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
              onClick={() => openModal('Tasks', modalContent2)}
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
              onClick={() => openModal('Collaborators', modalContent2)}
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
              onClick={() => openModal('Notifications', modalContent2)}
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
      />
    </div>
    </div>
  );
};

export default Dashboard;