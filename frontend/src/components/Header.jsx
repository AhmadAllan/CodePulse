import { Link, useLocation } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Function to check if a path is active
  const isActive = (path) => path === location.pathname;

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto flex items-center justify-between p-3">
        <Link to="/">CodePulse</Link>
        {userInfo ? (
          <>
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  to="/dashboard"
                  className={`text-gray-400 ${
                    isActive("/dashboard")
                      ? "text-white border-b-2 border-white"
                      : ""
                  }`}
                >
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`text-gray-400 ${
                    isActive("/projects" || "/codeEditor" || "/versionControl" || "/codeReview" || "/taskManagement")
                      ? "text-white border-b-2 border-white"
                      : ""
                  }`}
                >
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className={`text-gray-400 ${
                    isActive("/chat")
                      ? "text-white border-b-2 border-white"
                      : ""
                  }`}
                >
                  <span>Chat</span>
                </Link>
              </li>
            </ul>
            <Menu as="div" className="relative inline-block text-right">
              <div className="bg-transparent">
                <Menu.Button className="flex w-full justify-center gap-x-1.5 items-center p-1">
                  {userInfo.name}
                  <UserCircleIcon
                    className="-mr-1 h-8 w-8 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                  <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={logoutHandler}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                    
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        ) : (
          <>
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  to="/login"
                  className={`text-gray-400 flex items-center ${
                    isActive("/login") ? "text-white" : "" // Add 'text-white' class for active link
                  }`}
                >
                  <FaSignInAlt /> {/* Log in icon */}
                  <span className="ml-1">Sign In</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`text-gray-400 flex items-center ${
                    isActive("/register") ? "text-white" : "" // Add 'text-white' class for active link
                  }`}
                >
                  <FaSignOutAlt /> {/* Log out icon */}
                  <span className="ml-1">Sign Up</span>
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
