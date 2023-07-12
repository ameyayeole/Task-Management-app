import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboardside from '../components/adminDashboardside';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userTasks, setUserTasks] = useState([]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/search?email=${searchQuery}`);
      const userData = response.data;

      setUserTasks(userData.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <AdminDashboardside/>
    <main>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search user email..."
      />
      <button onClick={handleSearchSubmit}>Search</button>

      {userTasks.map((task) => (
        <li key={task._id} className="collection-item">
          <div className="row">
            <div className="col s12">
              <h6>{task.title}</h6>
              <p>{task.body}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Assigned to: {task.assignedTo}</p>
              <label>
                <input type="checkbox" checked={task.status} />
                <span>Completed</span>
              </label>
            </div>
          </div>
        </li>
      ))}
    </main>
    </>
  );
};

export default Search;
