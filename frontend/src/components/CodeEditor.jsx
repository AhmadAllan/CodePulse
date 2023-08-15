import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineFile } from "react-icons/ai";
import { SiGithubactions } from "react-icons/si";
import {
  getRepository,
  getUser,
  fetchFile,
  fetchFiles,
  updateFile
} from "../services/githubService";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = () => {
  // Options for the Monaco editor
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    theme: "vs-dark",
  };

  const defaultProject = useSelector((state) => state.defaultProject);


  const [files, setFiles] = useState([]);
  const [fileModel, setFileModel] = useState(false);
  const [gitModel, setGitModel] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const filesData = await fetchFiles();
        setFiles(filesData);
      } catch (error) {
        console.error("Error fetching Files:", error);
        throw error;
      }
    }
    fetchData();
  }, []);

  // Test on one file
  useEffect(() => {
    async function fetchData() {
      try {
        const fileData = await fetchFile("test2", "readme.md");
        setContent(fileData);
      } catch (error) {
        console.error("Error fetching File:", error);
        throw error;
      }
    }
    fetchData();
  });
  return (
    <div className="flex bg-gray-100">
      <div className="w-14 bg-gray-950 flex flex-col content-center border-r border-gray-700">
        <div
          className={`p-3 hover:bg-slate-400 ${
            fileModel ? "border-l-4 border-blue-500" : ""
          }`}
          onClick={() => {
            setFileModel(!fileModel);
            setGitModel(false);
          }}
        >
          <AiOutlineFile color="white" size={30} />
        </div>
        <div
          className={`p-3 hover:bg-slate-400 ${
            gitModel ? "border-l-4 border-blue-500" : ""
          }`}
          onClick={() => {
            setGitModel(!gitModel);
            setFileModel(false);
          }}
        >
          <SiGithubactions color="white" size={30} />
        </div>
      </div>

      {/* File Model */}
      {fileModel && (
        <div className="flex-none w-1/4 bg-gray-950 border-r border-gray-700 p-3">
          <h1 className="text-white text-lg">File Explorer</h1>
          <ul className="text-white">
            <li className="flex">
              <AiOutlineFile color="white" />
              Readme.md
            </li>
            {/* {files.map((file) => (
              <li
                key={file.name}
                className="flex cursor-pointer"
                onClick={async () => {
                  try {
                    const fileData = await fetchFile("test2", file.name);
                    setContent(fileData);
                    setFile(file.name); // Store the currently displayed file
                  } catch (error) {
                    console.error("Error fetching File:", error);
                  }
                }}
              >
                <AiOutlineFile color="white" />
                {file.name}
              </li>
            ))} */}
          </ul>
        </div>
      )}
      {/* Git Model */}
      {gitModel && (
        <div className="flex-none w-1/4 bg-gray-950 border-r border-gray-700 p-3">
          <h1 className="text-white text-lg">Git</h1>
          {/* Add your Git content here */}
        </div>
      )}
      <div className="flex-1 bg-gray-800">
        <MonacoEditor
          width="100%"
          height="100vh"
          language="javascript"
          theme="vs-dark"
          options={editorOptions}
          value={content}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
