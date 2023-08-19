import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [edu, setEdu] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const userData = {
          name,
          username,
          email,
          password,
          token,
          country,
          gender,
          edu,
        };

        const res = await register(userData).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const countries = ["USA", "Canada", "UK", "Germany", "Australia"];
  const genders = ["Male", "Female", "Other"];
  const educationLevels = ["High School", "Bachelor", "Master", "PhD"];

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <form onSubmit={submitHandler}>
      <div className="my-2">
          <label htmlFor="name" className="block mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-2">
          <label htmlFor="username" className="block mb-1">
            username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            GitHub Token
          </label>

          <input
            type="token"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        {/* Country select */}
        <div className="my-2">
          <label htmlFor="country" className="block mb-1">
            Country:
          </label>
          <select
            id="country"
            className="block w-full bg-transparent px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={country}
            onChange={(e) => {setCountry(e.target.value)}}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Gender select */}
        <div className="my-2">
          <label htmlFor="gender" className="block mb-1">
            Gender:
          </label>
          <select
            id="gender"
            className="block w-full bg-transparent px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select a gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Education select */}
        <div className="my-2">
          <label htmlFor="education" className="block mb-1">
            Education Level:
          </label>
          <select
            id="education"
            className="block w-full bg-transparent px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={edu}
            onChange={(e) => setEdu(e.target.value)}
          >
            <option value="">Select an education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
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
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </span>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;
