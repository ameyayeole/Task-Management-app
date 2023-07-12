import React from 'react'

const AdminDashboardside = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    
    window.location.href = '/login';
  };
  return (
    <div className="App">
    <nav>
      <div className="nav-wrapper #fce4ec blue lighten-2">
        <a href="#!" className="brand-logo center">Task Management</a>
        </div>
    </nav>
    <ul id="slide-out" className="sidenav sidenav-fixed #fce4ec blue lighten-2">
    
    <h3 className='dashboardName'>Hello,</h3>
      <li><a href="/adminDashboard">Dashboard</a></li>
      <li><a href="/addUser">Add User</a></li>
      <li><a href="/assignTask">Assign Task</a></li>
      <li><a href="/search">Search</a></li>

      <li><a onClick={handleLogout}> Logout</a></li>
    </ul>  
  </div>
  )
}

export default AdminDashboardside