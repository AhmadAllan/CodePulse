import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const clearError = (field) => {
    // Create a copy of the current fieldErrors state
    const newFieldErrors = { ...fieldErrors };
    // Clear the error message for the specified field
    delete newFieldErrors[field];
    // Update the state with the cleared error message
    setFieldErrors(newFieldErrors);
  };

  const handleInputChange = (e, field) => {
    // Clear the error for the corresponding field
    clearError(field);
    // Update the state with the new input value
    switch (field) {
      case "name":
        setName(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        validateEmail(e.target.value); // Call the validation function
        break;
      case "password":
        setPassword(e.target.value);
        validatePassword(e.target.value); // Call the validation function
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      case "country":
        setCountry(e.target.value);
        break;
      case "gender":
        setGender(e.target.value);
        break;
      case "edu":
        setEdu(e.target.value);
        break;
      case "token":
        setToken(e.target.value);
        break;
      default:
        break;
    }
  };

  const validatePassword = (password) => {
    // Password should have at least 8 characters and contain one capital letter
    const isPasswordValid = /^(?=.*[A-Z]).{8,}$/.test(password);
    if (isPasswordValid) {
      // If the password meets the requirement, clear the error
      clearError("password");
    } else {
      // If the password doesn't meet the requirement, set the error message
      setFieldErrors({
        ...fieldErrors,
        password:
          "Password should be at least 8 characters with one capital letter",
      });
    }
    return isPasswordValid;
  };

  const validateEmail = (email) => {
    // Use a regular expression to check if the email format is correct
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isEmailValid) {
      // If the email format is correct, clear the error
      clearError("email");
    } else {
      // If the email format is incorrect, set the error message
      setFieldErrors({
        ...fieldErrors,
        email: "Valid email is required",
      });
    }
    return isEmailValid;
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    // if (!username || !validateUsername(username)) {
    //   errors.username = "Username is required or already taken";
    // }

    if (!email || !validateEmail(email)) {
      errors.email = "Valid email is required";
    }

    if (!password || !validatePassword(password)) {
      errors.password =
        "Password should be at least 8 characters with one capital letter";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!country) {
      errors.country = "Country is required";
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!edu) {
      errors.edu = "Education level is required";
    }

    if (!token) {
      errors.token = "GitHub Token is required";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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
        console.log("1- here");
        navigate("/otp-verification", { state: userData });
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const countries = ["USA", "Canada", "UK", "Germany", "Australia"];
  const genders = ["Male", "Female", "Other"];
  const educationLevels = ["High School", "Bachelor", "Master", "PhD"];

  return (
    <FormContainer>
      <ToastContainer />
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <form onSubmit={submitHandler}>
        {/* Name */}
        <div className="my-2">
          <label htmlFor="name" className="block mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            className={`w-full px-4 py-2 border ${
              fieldErrors.name ? "border-red-500" : "border-gray-300"
            } rounded`}
            value={name}
            onChange={(e) => handleInputChange(e, "name")}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-sm">{fieldErrors.name}</p>
          )}
        </div>

        {/* Username */}
        {/* <div className="my-2">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            className={`w-full px-4 py-2 border ${
              fieldErrors.username ? "border-red-500" : "border-gray-300"
            } rounded`}
            value={username}
            onChange={(e) => handleInputChange(e, "username")}
          />
          {fieldErrors.username && (
            <p className="text-red-500 text-sm">{fieldErrors.username}</p>
          )}
        </div> */}

        {/* Email */}
        <div className="my-2">
          <label htmlFor="email" className="block mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className={`w-full px-4 py-2 border ${
              fieldErrors.email ? "border-red-500" : "border-gray-300"
            } rounded`}
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="my-2">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className={`w-full px-4 py-2 border ${
              fieldErrors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="my-2">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full px-4 py-2 border ${
              fieldErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded`}
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, "confirmPassword")}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* GitHub Token */}
        <div className="mb-4">
          <label className="block mb-1">GitHub Token</label>

          <input
            type="text"
            className={`w-full px-4 py-2 border ${
              fieldErrors.token ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter Token ex: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={token}
            onChange={(e) => handleInputChange(e, "token")}
          />
          {fieldErrors.token && (
            <p className="text-red-500 text-sm">{fieldErrors.token}</p>
          )}
        </div>

        {/* Country select */}
        <div className="my-2">
          <label htmlFor="country" className="block mb-1">
            Country:
          </label>
          <select
            id="country"
            className={`block w-full bg-transparent px-4 py-2 border ${
              fieldErrors.country ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
            value={country}
            onChange={(e) => handleInputChange(e, "country")}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {fieldErrors.country && (
            <p className="text-red-500 text-sm">{fieldErrors.country}</p>
          )}
        </div>

        {/* Gender select */}
        <div className="my-2">
          <label htmlFor="gender" className="block mb-1">
            Gender:
          </label>
          <select
            id="gender"
            className={`block w-full bg-transparent px-4 py-2 border ${
              fieldErrors.gender ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
            value={gender}
            onChange={(e) => handleInputChange(e, "gender")}
          >
            <option value="">Select a gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {fieldErrors.gender && (
            <p className="text-red-500 text-sm">{fieldErrors.gender}</p>
          )}
        </div>

        {/* Education select */}
        <div className="my-2">
          <label htmlFor="education" className="block mb-1">
            Education Level:
          </label>
          <select
            id="education"
            className={`block w-full bg-transparent px-4 py-2 border ${
              fieldErrors.edu ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
            value={edu}
            onChange={(e) => handleInputChange(e, "edu")}
          >
            <option value="">Select an education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {fieldErrors.edu && (
            <p className="text-red-500 text-sm">{fieldErrors.edu}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
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