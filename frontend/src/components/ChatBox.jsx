import React, { useState } from "react";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

const ChatBox = ({isOpen}) => {
// const ChatBox = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // const toggleDrawer = () => {
  //   setIsOpen(!isOpen);
  //   setIsChatOpen(false); // Close chat when drawer is closed
  // };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-600"
        onClick={toggleDrawer}
      >
        <h3 className="text-black">Hello</h3>
      </button> */}
      <div
        className={`fixed top-0 right-0 h-screen w-1/4 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col items-center ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-white font-bold p-4 text-xl">Messages Box</h1>
        {isChatOpen ? (
          <>
            <button
              className="absolute top-4 left-4 text-gray-400 hover:text-white"
              onClick={toggleChat}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            {/* Chat content */}
            <div className="p-4">
              <div className="flex flex-col space-y-2">
                {/* User message on the right */}
                <div className="flex items-end justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                    Hello, how can I help you?
                  </div>
                  <UserCircleIcon
                    className="h-6 w-6 text-gray-400 ml-2"
                    aria-hidden="true"
                  />
                </div>

                {/* Other user message on the left */}
                <div className="flex items-start">
                  <UserCircleIcon
                    className="h-6 w-6 text-gray-400 mr-2"
                    aria-hidden="true"
                  />
                  <div className="bg-gray-300 rounded-lg p-2 max-w-xs">
                    Hi there! Im a bot.
                  </div>
                </div>

                {/* Add more messages as needed */}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* User list */}
            <div onClick={toggleChat} className="items-center flex bg-slate-50 rounded-md w-11/12 hover:cursor-pointer">
              <UserCircleIcon
                className="-mr-1 h-10 w-10 text-gray-400"
                aria-hidden="true"
              />
              <h1 className="pl-4">Ahmad</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBox;
