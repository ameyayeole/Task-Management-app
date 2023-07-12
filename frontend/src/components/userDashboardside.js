import React from 'react'

const UserDashboardside = () => {

    const handleLogout = () => {
      localStorage.removeItem('token');
      
      window.location.href = '/login';
    };

  return (
    <div className="App">
    <nav>
      <div className="nav-wrapper white #fce4ec blue lighten-2">
        <a href="#!" className="brand-logo center">Task Management</a>
       </div>
    </nav>
    <ul id="slide-out" className="sidenav sidenav-fixed #fce4ec blue lighten-2">
    
     <h3 className='dashboardName'>Hello,</h3>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/addTask">Add Task</a></li>
      
      <li><a onClick={handleLogout}> Logout</a></li>


    </ul>

  
  </div>
  )
}

export default UserDashboardside