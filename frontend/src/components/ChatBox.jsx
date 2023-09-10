import { useState, useEffect } from "react";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { fetchAllUsers } from "../services/getAllUsers";
import { useSelector } from "react-redux";
import { fetchProjectById } from "../services/projectService";
import Loader from "../components/Loader";

const ChatBox = ({ isOpen, projectId }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState();
  const [filtered, setFiltered] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    console.log(users);
    console.log(project);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchAllUsers();
        const projectData = await fetchProjectById(projectId);
        setUsers(userData);
        setProject(projectData.projectInfo.project);
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
    fetchData();
  }, []);

  const filter = () => {
    const filteredMembers = users
      .map((user) => {
        console.log(user._id);
        const filteredMember = project.members.find(
          (member) => member.id === user._id
        );
        console.log("finished");
        return filteredMember;
      })
      .filter((member) => member !== undefined); // Filter out undefined values

    console.log(filteredMembers);

    // Now you can update the state with the filtered members
    setFiltered(filteredMembers);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen w-1/4 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col items-center ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {users && project ? (
          <>
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
                {filtered.map((user) => (
                  <div
                    key={user.id}
                    onClick={toggleChat}
                    className="items-center flex bg-slate-50 rounded-md w-11/12 hover:cursor-pointer m-2"
                  >
                    <UserCircleIcon
                      className="-mr-1 h-10 w-10 text-gray-400"
                      aria-hidden="true"
                    />
                    <h1 className="pl-4">{user.name}</h1>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ChatBox;
