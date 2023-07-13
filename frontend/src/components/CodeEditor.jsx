import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const CodeEditor = () => {
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
    theme: 'vs-dark',
  };

  const [isFilesVisible, setIsFilesVisible] = useState(false);
  const [isSourceControlVisible, setIsSourceControlVisible] = useState(false);

  const toggleFilesVisibility = () => {
    setIsFilesVisible(!isFilesVisible);
  };

  const toggleSourceControlVisibility = () => {
    setIsSourceControlVisible(!isSourceControlVisible);
  };

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/5 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Explorer</h2>
          <div className="mb-4">
            <button
              className="flex items-center mb-2 text-white opacity-75 hover:opacity-100"
              onClick={toggleFilesVisibility}
            >
              <span className="w-4 h-4 mr-2"></span>
              Files
            </button>
            {isFilesVisible && (
              <div className="pl-4">
                <p className="text-gray-400">Project Name</p>
                <ul className="mt-2">
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 mr-2"></span>
                    File 1
                  </li>
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 mr-2"></span>
                    File 2
                  </li>
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 mr-2"></span>
                    File 3
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <button
              className="flex items-center mb-2 text-white opacity-75 hover:opacity-100"
              onClick={toggleSourceControlVisibility}
            >
              <span className="w-4 h-4 mr-2"></span>
              Source Control
            </button>
            {isSourceControlVisible && (
              <div className="pl-4">
                <ul className="mt-2">
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 mr-2"></span>
                    Repository 1
                  </li>
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 mr-2"></span>
                    Repository 2
                  </li>
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 mr-2"></span>
                    Repository 3
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-800">
        <MonacoEditor
          width="100%"
          height="100vh"
          language="javascript"
          theme="vs-dark"
          options={editorOptions}
          value="// Start coding here..."
        />
      </div>
    </div>
  );
};

export default CodeEditor;
