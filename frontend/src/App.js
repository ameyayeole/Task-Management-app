 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup'
import Login from './pages/login';
import AddTask from './pages/AddTask';
import Dashboard from './pages/userDashboard';
import AdminDashboard from './pages/adminDashboard';
import AssignTask from './pages/assignTask';
import AddUser from './pages/addUser';
import Search from './pages/search';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/assignTask" element={<AssignTask />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />

      </Routes>
    </Router>
  );
};

export default App;
