import { useState, useEffect } from "react";
import { userSearch } from "../services/userSearchService";

const UserSearch = ({onSelect}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await userSearch(searchTerm);
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("No user found:", error);
        setError("An error occurred while searching for users.");
      }
    };

    if (searchTerm.length > 0) {
      handleSearch();
    } else {
      setUsers([]);
      setError(null);
    }
  }, [searchTerm]);

  const handleUserClick = (user) => {
    onSelect(user);
    setSearchTerm("");
  };

  return (
    <div>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        className="w-full px-4 py-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p>{error}</p>}

      {users.length > 0 && (
        <ul className="dropdown-list mt-2 w-full border border-gray-300 rounded">
          {users.map((user) => (
            <li  key={user._id}
            className="cursor-pointer hover:bg-blue-400 px-2 border-b-2"
            onClick={() => handleUserClick(user)}>
              <p className="text-black">{user.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;
