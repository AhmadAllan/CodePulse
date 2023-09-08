import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import setupLogoutOnClose from "./slices/logoutOnClose";
import Hero from "./screens/Hero";
import Login from "./screens/Login";
import Register from "./screens/Register";
import App from "./App";
import store from "./store";
import Dashboard from "./screens/Dashboard";
import Projects from "./screens/Projects";
import CodeEditor from "./screens/CodeEditor";
import VersionControl from "./screens/VersionControl";
import ChatPage from "./screens/ChatPage";
import CodeReview from "./screens/CodeReview";
import TaskManagement from "./screens/TaskManagement";
import ProfilePage from "./screens/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import UserSearch from "./components/UserSearch";
import OtpVerification from "./components/OtpVerification";
import ContactUsPage from "./screens/ContactUsPage";
import AboutUs from "./screens/AboutUs";

// Create a BrowserRouter instance
const router = createBrowserRouter(
  // Create routes from JSX elements
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Define routes with their corresponding screens */}
      <Route index={true} path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/about" element={<AboutUs />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/codeEditor" element={<CodeEditor />} />
        <Route path="/versionControl" element={<VersionControl />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/codeReview" element={<CodeReview />} />
        <Route path="/taskManagement" element={<TaskManagement />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user-search" element={<UserSearch />} />
      </Route>
    </Route>
  )
);
setupLogoutOnClose(store);
// Render the application to the root element
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

