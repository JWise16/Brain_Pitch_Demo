import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/teacher/home" activeclassname="active">Teacher Home</NavLink>
        </li>
        <li>
          <NavLink to="/student/home" activeclassname="active">Student Home</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
