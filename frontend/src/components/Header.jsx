import { Link, useLocation } from 'react-router-dom';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path) => path === location.pathname;

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/">CodePulse</Link> {/* Logo or site name */}
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/login"
              className={`text-gray-400 flex items-center ${
                isActive('/login') ? 'text-white' : '' // Add 'text-white' class for active link
              }`}
            >
              <FiLogIn /> {/* Log in icon */}
              <span className="ml-1">Sign In</span> {/* Link text */}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`text-gray-400 flex items-center ${
                isActive('/register') ? 'text-white' : '' // Add 'text-white' class for active link
              }`}
            >
              <FiLogOut /> {/* Log out icon */}
              <span className="ml-1">Sign Up</span> {/* Link text */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
