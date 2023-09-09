import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer from "../components/FormContainer";
import * as yup from 'yup';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
  
      // Validation passed, proceed with login request
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      } else {
        if (err.status === 400) {
          // Handle 400 status error here
          toast.error("Invalid email or incorrect password");
        } else {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  };

  return (
    <FormContainer>
      <ToastContainer />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form onSubmit={submitHandler}>
          {/* Email input */}
          <div className="my-2">
            <label htmlFor="email" className="block mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className={`w-full px-4 py-2 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationErrors.email && <div className="text-red-500 text-sm">{validationErrors.email}</div>}
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
              className={`w-full px-4 py-2 border ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validationErrors.password && <div className="text-red-500 text-sm">{validationErrors.password}</div>}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
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
