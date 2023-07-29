import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

const Login = () => {
  return (
    // Add layout to the login
    <FormContainer>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form>
          {/* Email input */}
          <div className="my-2">
            <label htmlFor="email" className="block mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          {/* Password input */}
          <div className="my-2">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          {/* Loader component (optional) */}
          {/* { isLoading && <Loader /> } */}
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
          >
            Sign In
          </button>
          {/* Registration link */}
          <div className="py-3">
            <span className="text-sm">
              New Customer?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default Login;