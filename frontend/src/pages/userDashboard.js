import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboardside from '../components/userDashboardside';

const Dashboard = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); 
    setToken(storedToken);
 
  }, []);

    


  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchMyTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/myTask', config);
      const { myTasks } = response.data;
      setMyTasks(myTasks);
    } catch (error) {
      console.log(error);
    }
  };
  fetchMyTasks();
  const handleCheckboxChange = async (taskId, checked) => {
    try {
      const updatedTasks = myTasks.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            status: true,
          };
        }
        return task;
      });

      setMyTasks(updatedTasks);

      const response = await axios.put(
        `http://localhost:4000/updateTask/${taskId}`,
        { status: true },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteTask/${taskId}`, config);
      console.log(response.data);
      const updatedTasks = myTasks.filter((task) => task._id !== taskId);
      setMyTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <UserDashboardside />
      <main>
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>My Tasks</h4>
          </li>
          {myTasks.map((task) => (
            <li key={task._id} className="collection-item">
              <div className="row">
                <div className="col s12">
                  <h6>{task.title}</h6>
                  <p>{task.body}</p>
                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.status}
                      onChange={(e) => handleCheckboxChange(task._id, e.target.checked)}
                    />
                    <span>Completed</span>
                  </label>
                  <button className="btn red" onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Dashboard;
