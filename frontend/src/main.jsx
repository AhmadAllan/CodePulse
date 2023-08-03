import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";
import App from "./App";
import store from "./store";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import CodeEditor from "./components/CodeEditor";
import VersionControl from "./components/VersionControl";
import ChatPage from "./components/ChatPage";
import CodeReview from "./components/CodeReview";
import TaskManagement from "./components/TaskManagement";
import PrivateRoute from "./utils/PrivateRoute";

// Create a BrowserRouter instance
const router = createBrowserRouter(
  // Create routes from JSX elements
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Define routes with their corresponding components */}
      <Route index={true} path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/codeEditor" element={<CodeEditor />} />
        <Route path="/versionControl" element={<VersionControl />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/codeReview" element={<CodeReview />} />
        <Route path="/taskManagement" element={<TaskManagement />} />
      </Route>
    </Route>
  )
);

// Render the application to the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the application with Redux Provider and StrictMode
  <Provider store={store}>
    <React.StrictMode>
      {/* Provide the router instance to the application */}
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
