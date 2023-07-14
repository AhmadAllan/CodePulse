import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState('project');
  const [projectChatMessages, setProjectChatMessages] = useState([
    {
      id: '1',
      author: 'User2',
      content: 'Hello! How are you?',
      timestamp: '2022-01-01T10:30:00.000Z',
    },
    {
      id: '2',
      author: 'User2',
      content: 'Are you available for a meeting?',
      timestamp: '2022-01-01T11:00:00.000Z',
    },
    {
      id: '3',
      author: 'User1',
      content: "Hi! I'm doing well. Yes, I'm available for a meeting.",
      timestamp: '2022-01-01T11:15:00.000Z',
    },
  ]);
  const [userChatMessages, setUserChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleChatSwitch = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'User1', // Assuming the current user is User1
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (selectedChat === 'project') {
      setProjectChatMessages([...projectChatMessages, message]);
    } else {
      setUserChatMessages([...userChatMessages, message]);
    }

    setNewMessage('');
  };

  const renderChatMessages = () => {
    if (selectedChat === 'project') {
      return projectChatMessages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${message.author === 'User1' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex-none rounded-full h-8 w-8 flex items-center justify-center mr-2 ${message.author === 'User1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
            {message.author[0]}
          </div>
          <div className={`bg-gray-200 rounded-lg py-2 px-4 ${message.author === 'User1' ? 'bg-blue-100' : ''}`}>
            <p className="text-gray-800">{message.content}</p>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
        </div>
      ));
    } else {
      return userChatMessages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${message.author === 'User1' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex-none rounded-full h-8 w-8 flex items-center justify-center mr-2 ${message.author === 'User1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
            {message.author[0]}
          </div>
          <div className={`bg-gray-200 rounded-lg py-2 px-4 ${message.author === 'User1' ? 'bg-blue-100' : ''}`}>
            <p className="text-gray-800">{message.content}</p>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <div className="w-1/4 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <ul>
          <li
            className={`cursor-pointer mb-2 p-2 rounded-lg ${
              selectedChat === 'project' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleChatSwitch('project')}
          >
            Project Chat
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 rounded-lg ${
              selectedChat === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleChatSwitch('user')}
          >
            User Chat
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-md p-4 ml-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Chat</h1>
        <div className="h-96 overflow-y-auto mb-4">{renderChatMessages()}</div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-200 rounded-lg p-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 ml-2 focus:outline-none"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
