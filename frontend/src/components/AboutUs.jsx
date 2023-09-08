const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">About CodePulse</h1>
        <p className="text-gray-700 mb-6">
          CodePulse is a web-based code collaboration platform developed as a graduation project for Software Engineering from Al-Balqa` Applied University by Ahmad Abed Ibrahim Allan and Jaafar AbdalMajid Muflih Al-Wahsh.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
        <p className="text-gray-700 mb-6">
          CodePulse is designed to facilitate real-time collaboration among developers. It offers features such as code editing with syntax highlighting and code completion, version control, real-time collaboration, chat and discussion, code review, project management, notifications, code sharing, forking, and deployment.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Project Team</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Ahmad Abed Ibrahim Allan - <a href="https://github.com/AhmadAllan">GitHub Profile</a></li>
          <li>Jaafar AbdalMajid Muflih Al-Wahsh - <a href="https://github.com/JaafarAbdalmajeed">GitHub Profile</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
