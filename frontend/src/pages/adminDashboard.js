import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboardside from '../components/adminDashboardside';
import BarChart from '../d3js visuals/barchart';
import PieChart from '../d3js visuals/dateBarchart';

const AdminDashboard = () => {

  const [allTasks, setAllTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
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


const fetchallTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allTasks', config);
      const { allTask } = response.data;
      setAllTasks(allTask);
      const userResponse = await axios.get(`http://localhost:4000/allUsers`, config);
      const {allUser} = userResponse.data;
      setAllUsers(allUser)
    } catch (error) {
      console.log(error);
    }
  };

    fetchallTasks();
  
  

  const handleCheckboxChange = async (taskId, checked) => {
    try {
      const updatedTasks = allTasks.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            status: true,
          };
        }
        return task;
      });

      setAllTasks(updatedTasks);

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
      const updatedTasks = allTasks.filter((task) => task._id !== taskId);
      setAllTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAssignedTo = (userID) => {
    const user = allUsers.filter((user) => user._id === userID);
 
    return user[0]?.name || '';
  };

  const handleFilter = (status) => {
    setFilterStatus(status);

    if (status === 'all') {
      setFilteredTasks(allTasks);
    } else {
      const filtered = allTasks.filter((task) => task.status === (status === 'true'));
      setFilteredTasks(filtered);
    }
  };



  

const handleSort = () => {
    if (sortOrder === 'asc') {
      const sortedTasks = [...filteredTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setFilteredTasks(sortedTasks);
      setAllTasks(sortedTasks);
      setSortOrder('desc');
    } else {
      const sortedTasks = [...filteredTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      setFilteredTasks(sortedTasks);
      setAllTasks(sortedTasks);
      setSortOrder('asc');
    }
  };
  
 
  
  
  const trueTasks = allTasks.filter((task) => task.status);
  const falseTasks = allTasks.filter((task) => !task.status);

  const tasksToRender = filterStatus === 'all' ? allTasks : filteredTasks;
  return (
    <>
    <AdminDashboardside/>
    <main>
    <div className='chart'>
    <div className='barchart'> 
    <BarChart trueData={trueTasks} falseData={falseTasks} />
     </div>
    <div className='piechart'> 
    <PieChart tasks={allTasks}/>
    </div>
   
    </div>
    <div className="filter-container">
           Filter:
          <button className={`filter-button ${filterStatus === 'all' && 'active'}`} onClick={() => handleFilter('all')}>
            All 
          </button>
          <button className={`filter-button ${filterStatus === 'true' && 'active'}`} onClick={() => handleFilter('true')}>
            Completed
          </button>
          <button className={`filter-button ${filterStatus === 'false' && 'active'}`} onClick={() => handleFilter('false')}>
            Incomplete
          </button>
          <button className="sort-button" onClick={handleSort}>
            Sort by duedate
          </button>
        </div>
    <ul className="collection with-header">
          <li className="collection-header">
            <h4>All Users Tasks</h4>
          </li>
          {tasksToRender.map((task) => (
            <li key={task._id} className="collection-item">
              <div className="row">
                <div className="col s12">
                  <h6>{task.title}</h6>
                  <p>{task.body}</p>
                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p>Assigned to: {handleAssignedTo(task.assignedTo)}</p>
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
  )
}

export default AdminDashboard