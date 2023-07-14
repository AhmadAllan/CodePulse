import { useState } from 'react';

const CodeReview = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentCategory, setCommentCategory] = useState('all');

  const currentUserRole = selectedProject?.leader === 'your_username' ? 'leader' : 'member';

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim() === '') {
      return;
    }

    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      project: selectedProject?.name,
      file: selectedFile,
      content: newComment,
      category: currentUserRole === 'leader' ? 'under review' : 'posted',
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleCategoryChange = (commentId, category) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, category };
        }
        return comment;
      })
    );
  };

  const filteredComments = comments.filter((comment) => {
    if (commentCategory === 'all') {
      return true;
    }
    return comment.category === commentCategory;
  });

  const projectOptions = [
    { name: 'Project A', leader: 'leader1' },
    { name: 'Project B', leader: 'leader2' },
    { name: 'Project C', leader: 'your_username' }, // Your created project
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Code Review</h1>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Select Project:</h2>
        <select
          value={selectedProject?.name || ''}
          onChange={(e) => handleProjectSelect(projectOptions.find((p) => p.name === e.target.value))}
          className="bg-gray-200 rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Project</option>
          {projectOptions.map((project) => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
        <>
          {currentUserRole === 'leader' && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Comment Category:</h2>
              <select
                value={commentCategory}
                onChange={(e) => setCommentCategory(e.target.value)}
                className="bg-gray-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="under review">Under Review</option>
                <option value="done">Done</option>
                <option value="not reviewed">Not Reviewed</option>
              </select>
            </div>
          )}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Select File:</h2>
            <ul className="list-disc pl-6">
              <li
                className={`cursor-pointer ${selectedFile === 'file1' ? 'text-blue-500' : ''}`}
                onClick={() => handleFileSelect('file1')}
              >
                File 1
              </li>
              <li
                className={`cursor-pointer ${selectedFile === 'file2' ? 'text-blue-500' : ''}`}
                onClick={() => handleFileSelect('file2')}
              >
                File 2
              </li>
              <li
                className={`cursor-pointer ${selectedFile === 'file3' ? 'text-blue-500' : ''}`}
                onClick={() => handleFileSelect('file3')}
              >
                File 3
              </li>
            </ul>
          </div>
          {selectedFile && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Selected File: {selectedFile}</h2>
              {/* Code display for selected file */}
            </div>
          )}
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              name="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your comment..."
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 focus:outline-none"
            >
              Submit Comment
            </button>
          </form>
          <div>
            {filteredComments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-800">{comment.content}</p>
                {currentUserRole === 'leader' && (
                  <div className="mt-2">
                    <span className="mr-2">Category:</span>
                    <select
                      value={comment.category}
                      onChange={(e) => handleCategoryChange(comment.id, e.target.value)}
                      className="bg-gray-200 rounded-lg p-2 focus:outline-none"
                    >
                      <option value="under review">Under Review</option>
                      <option value="done">Done</option>
                      <option value="not reviewed">Not Reviewed</option>
                    </select>
                  </div>
                )}
                {currentUserRole !== 'leader' && (
                  <button
                    onClick={() => handleCommentDelete(comment.id)}
                    className="text-red-500 hover:text-red-600 mt-2 focus:outline-none"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CodeReview;