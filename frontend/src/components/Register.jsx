import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <FormContainer>
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <form>
        <div className="my-2">
          <label htmlFor="name" className="block mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

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

        <div className="my-2">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Sign Up
        </button>

        <div className="py-3">
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">Log in</Link>
          </span>
        </div>
      </form>
    </FormContainer>
  );
};

export default RegisterScreen;
