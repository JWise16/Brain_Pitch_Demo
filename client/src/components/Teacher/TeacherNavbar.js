import React from 'react';
import { NavLink } from 'react-router-dom';
import './TeacherNavbar.css';

const TeacherNavbar = () => {
  return (
    <div className="teacher-navbar">
      <div className="sidebar">
        <h3>Class Name</h3>
        <ul>
          <li>
            <NavLink to="/teacher/modules" activeclassname="active">Modules</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/controls" activeclassname="active">Controls</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/student-view" activeclassname="active">Student View</NavLink>
          </li>
        </ul>
        <div className="sidebar-footer">
          <NavLink to="/teacher/all-courses" activeclassname="active">All courses</NavLink>
          <NavLink to="/teacher/account" activeclassname="active">Account</NavLink>
          <NavLink to="/teacher/settings" activeclassname="active">Settings</NavLink>
        </div>
      </div>
    </div>
  );
};

export default TeacherNavbar;
