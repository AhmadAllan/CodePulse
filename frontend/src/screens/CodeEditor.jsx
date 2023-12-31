import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineFile, AiFillDelete, AiOutlineMessage } from "react-icons/ai";
import { SiGithubactions, } from "react-icons/si";
import { fetchFile } from "../services/githubService";
import { fetchProjectById, updateProject } from "../services/projectService";
import MonacoEditor from "react-monaco-editor";
import Loader from "../components/Loader";
import ChatBox from "../components/ChatBox";

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
  const editorRef = useRef(null);

  const location = useLocation();

  const [project, setProject] = useState(null);
  const [fileModel, setFileModel] = useState(false);
  const [gitModel, setGitModel] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [newFile, setNewFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await fetchProjectById(location.state);
        setProject(projectData.projectInfo);
        console.log(location.state);
      } catch (error) {
        console.error("Error fetching Files:", error);
        throw error;
      }
    }
    fetchData();
  }, [location.state]);

  const fetchFileData = async (fileName) => {
    try {
      const fileData = await fetchFile(project.project.name, fileName);
      setContent(fileData);
      setFile(fileName);
      console.log(fileName);
    } catch (error) {
      console.error("Error fetching File:", error);
      throw error;
    }
  };

  const createFile = async () => {
    try {
      const projectData = {
        name: project.project.name,
        createdFile: newFile,
        newFileContent: editorRef.current.getValue(),
        commitMessage: commitMessage,
      };

      // Update project's files in state after creation
      const updatedFiles = [...project.files, newFile];
      setProject((prevProject) => ({
        ...prevProject,
        files: updatedFiles,
      }));

      setSelectedFile(newFile);

      await updateProject(project.project.id, projectData);
    } catch (error) {
      console.error("Error creating file:", error);
      throw error;
    }
  };

  const saveFile = async () => {
    try {
      const projectData = {
        name: project.project.name,
        newFileContent: editorRef.current.getValue(),
        updatedFile: file,
        commitMessage: commitMessage,
      };

      await updateProject(project.project.id, projectData);
    } catch (error) {
      console.error("Error creating file:", error);
      throw error;
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const projectData = {
        name: project.project.name,
        deletedFile: fileName,
      };

      const updatedFiles = project.files.filter((file) => file !== fileName);
      setProject((prevProject) => ({
        ...prevProject,
        files: updatedFiles,
      }));

      setSelectedFile("");
      setContent("");

      const updatedProject = await updateProject(
        project.project.id,
        projectData
      );
      console.log("response", updatedProject);
    } catch (error) {
      console.error("Error update file:", error);
      throw error;
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <div className=" min-h-screen flex bg-gray-100">
      {project ? (
        <>
          <div className="w-14 bg-gray-950 flex flex-col content-center border-r-2 border-gray-700">
            <div
              className={`p-3 hover:bg-slate-400 ${
                fileModel ? "border-l-4 border-blue-500" : ""
              }`}
              onClick={() => {
                setFileModel(!fileModel);
                setGitModel(false);
                setCommitMessage("");
                setNewFile("");
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
                setShowInput(false);
                setCommitMessage("");
              }}
            >
              <SiGithubactions color="white" size={30} />
            </div>

            <div
              className={`p-3 hover:bg-slate-400 ${
                gitModel ? "border-l-4 border-blue-500" : ""
              }`}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMessage color="white" size={30} />
            </div>
          </div>

          {/* File Model */}
          {fileModel && (
            <div className="flex-none w-1/6 bg-gray-950 border-r border-gray-700 p-3">
              <h1 className="text-white text-lg">File Explorer</h1>
              {showInput ? (
                <form>
                  <div className="my-2">
                    <input
                      type="text"
                      id="fileName"
                      placeholder="Enter Project Name"
                      className="text-white w-full px-2 border border-gray-300 rounded bg-transparent"
                      value={newFile}
                      onChange={(e) => setNewFile(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      type="text"
                      id="commit"
                      placeholder="Enter commit"
                      className="text-white w-full px-2 border border-gray-300 rounded bg-transparent"
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
                    onClick={() => {
                      setShowInput(false);
                      createFile();
                    }}
                  >
                    Create File
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-3 ml-2"
                    onClick={() => setShowInput(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-1 rounded mt-3"
                  onClick={() => setShowInput(true)}
                >
                  Create File
                </button>
              )}
              <ul className="text-white">
                {project.files.map((file) => (
                  <li
                    key={file}
                    className={`flex gap-x-1.5 items-center p-1 my-1 hover:bg-gray-400 hover:cursor-pointer ${
                      file === selectedFile ? "bg-gray-400" : ""
                    }`}
                    onClick={() => {
                      fetchFileData(file);
                      setSelectedFile(file); // Set the selected file
                    }}
                  >
                    <AiOutlineFile color="white" />
                    {file}
                    <AiFillDelete
                      color="red"
                      size={20}
                      className="ml-auto hover:bg-slate-300 "
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the parent onClick event
                        handleDeleteFile(file);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Git Model */}
          {gitModel && (
            <div className="flex-none w-1/6 bg-gray-950 border-r border-gray-700 p-3">
              <h1 className="text-white text-lg">Git</h1>
              <form>
                <div className="my-2">
                  <input
                    type="text"
                    id="commit"
                    placeholder="Enter commit message"
                    className="text-white w-full px-2 border border-gray-300 rounded bg-transparent"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-1 rounded mt-3"
                  onClick={() => {
                    setCommitMessage("");
                    saveFile();
                  }}
                >
                  commit
                </button>
              </form>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 bg-gray-800">
            <MonacoEditor
              width="100%"
              height="100vh"
              language="javascript"
              theme="vs-dark"
              options={editorOptions}
              value={content}
              editorDidMount={handleEditorDidMount}
            />
          </div>
          <ChatBox
            isOpen={isOpen}
            projectId={location.state}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
        </>
      )}
    </div>
  );
};

export default CodeEditor;
