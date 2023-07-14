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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<Hero/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route  path="/codeEditor" element={<CodeEditor />}/>
      <Route  path="/versionControl" element={<VersionControl />}/>
      <Route  path="/chat" element={<ChatPage />}/>
      <Route  path="/codeReview" element={<CodeReview />}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store} >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
