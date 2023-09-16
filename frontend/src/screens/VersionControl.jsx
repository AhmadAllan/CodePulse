import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { fetchProjectById } from '../services/projectService';
import Loader from '../components/Loader';

const VersionControl = () => {
  const [project, setProject] = useState(null);

  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await fetchProjectById(location.state);
        setProject(projectData.projectInfo);
      } catch (error) {
        console.error('Error fetching Project:', error);
        throw error;
      }
    }
    fetchData();
  }, [location.state]);

  const [expandedEvents, setExpandedEvents] = useState([]);

  const handlePushToggle = (eventIndex) => {
    setExpandedEvents((prevExpandedEvents) => ({
      ...prevExpandedEvents,
      [eventIndex]: !prevExpandedEvents[eventIndex],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {project ? (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">{project.project.name}</h1>
            <div className="bg-white shadow-md rounded-lg w-full p-6">
              <h2 className="text-2xl font-semibold mb-4">Version Control</h2>
              <div className="mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Branches</h3>
                  <ul className="list-disc list-inside">
                    {project.branches.map((branch) => (
                      <li key={branch} className="mb-2">
                        {branch}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Events</h3>
                {project.events.map((event, index) => (
  <div key={index} className="mb-4">
    <div
      className="border rounded-lg p-4 cursor-pointer"
      onClick={() => handlePushToggle(index)}
    >
      <span className="text-blue-500 font-semibold">{event.eventType}</span>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`ml-2 ${
          expandedEvents[index] ? 'transform rotate-180' : ''
        }`}
      />
      {expandedEvents[index] && (
        <div className="pl-4 pt-2">
          <p className="text-gray-600">
            Author: {event.actor}<br />
            Date: {event.eventTime}<br />
            File: test<br />
            Commit: {event.eventMessage}
          </p>
        </div>
      )}
    </div>
  </div>
))}
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default VersionControl;
