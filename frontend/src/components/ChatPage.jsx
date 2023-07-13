import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatPage = () => {
  const [projectChats] = useState([
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
  ]);

  const [selectedProjectChat, setSelectedProjectChat] = useState(projectChats[0]);
  const [user1Messages, setUser1Messages] = useState([]);
  const [user2Messages, setUser2Messages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch initial chat messages from the server or any other data source
    // For demonstration purposes, let's assume we have some initial messages for both users
    const initialUser1Messages = [
      { id: 1, content: 'Hello!', timestamp: new Date().toISOString() },
      { id: 2, content: 'How are you?', timestamp: new Date().toISOString() },
    ];
    setUser1Messages(initialUser1Messages);

    const initialUser2Messages = [
      { id: 1, content: 'Hi there!', timestamp: new Date().toISOString() },
      { id: 2, content: "I'm doing well, thanks!", timestamp: new Date().toISOString() },
    ];
    setUser2Messages(initialUser2Messages);
  }, []);

  const handleProjectChatSelection = (chat) => {
    setSelectedProjectChat(chat);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      id: user1Messages.length + 1,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setUser1Messages([...user1Messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Project Chats</h2>
        <ul>
          {projectChats.map((chat) => (
            <li
              key={chat.id}
              className={`mb-2 cursor-pointer ${
                selectedProjectChat.id === chat.id ? 'text-blue-500 font-semibold' : 'text-gray-800'
              }`}
              onClick={() => handleProjectChatSelection(chat)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-md p-6 ml-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{selectedProjectChat.name} Chat</h1>
        <div className="h-96 overflow-y-auto mb-6">
          {user1Messages.map((message) => (
            <div key={message.id} className="flex mb-2">
              <div className="flex-none bg-blue-500 text-white font-semibold rounded-full h-8 w-8 flex items-center justify-center mr-2">
                User1
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-800 font-semibold">User1</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-gray-800">{message.content}</p>
              </div>
            </div>
          ))}
          {user2Messages.map((message) => (
            <div key={message.id} className="flex mb-2 justify-end">
              <div className="flex-1 bg-blue-500 text-white rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-100 font-semibold">User2</span>
                  <span className="text-xs text-gray-300">{message.timestamp}</span>
                </div>
                <p>{message.content}</p>
              </div>
              <div className="flex-none bg-gray-200 text-gray-600 font-semibold rounded-full h-8 w-8 flex items-center justify-center ml-2">
                User2
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
