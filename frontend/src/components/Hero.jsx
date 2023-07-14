import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="py-10 bg-gray-200">
      <div className="container mx-auto flex justify-center">
        <div className="p-10 flex flex-col items-center bg-white rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Code Collaboration Platform
          </h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            Welcome to our code collaboration platform! Collaborate with others,
            manage projects, and boost productivity in a seamless environment.
          </p>
          <div className="flex">
            {/* Sign In button */}
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-blue-600"
            >
              Sign In
            </Link>
            {/* Sign Up button */}
            <Link
              to="/register"
              className="bg-gray-500 text-white px-6 py-3 rounded-lg ml-4 transition duration-300 hover:bg-gray-600"
            >
              Sign Up
            </Link>
          </div>
          <div className="mt-8">
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {/* List of features */}
              <li className="mb-2">
                Collaborate in real-time with multiple users on the same codebase.
              </li>
              <li className="mb-2">
                Access a powerful code editor with syntax highlighting and code completion.
              </li>
              <li className="mb-2">
                Utilize version control to seamlessly manage code changes and history.
              </li>
              <li className="mb-2">
                Chat and discuss with collaborators through private and group conversations.
              </li>
              <li className="mb-2">
                Conduct code reviews, provide feedback, and track changes effortlessly.
              </li>
              <li className="mb-2">
                Manage projects, create tasks, and monitor progress using the project dashboard.
              </li>
              <li className="mb-2">
                Receive real-time notifications about code changes, comments, and updates.
              </li>
              <li className="mb-2">
                Share code with others, fork existing projects, and explore public repositories.
              </li>
              <li className="mb-2">
                Deploy and access the platform securely from different devices.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
