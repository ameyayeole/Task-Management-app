import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
    <div className="nav-wrapper white">
      <Link to="/" className="brand-logo left">Task Management</Link>
      <ul id="nav-mobile" className="right ">
        <li><Link to="/">Signup</Link></li>
        <li><Link to="/login">Log in</Link></li>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar