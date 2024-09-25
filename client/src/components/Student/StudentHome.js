import React from 'react';
import './StudentHome.css';

const StudentHome = () => {
  return (
    <div className="home-container">
      <h1>brain.</h1>
      <div className="class-cards">
        <div className="class-card">Class 1</div>
        <div className="class-card">Class 2</div>
        <div className="class-card">Class 3</div>
        <div className="class-card">+</div>
      </div>
    </div>
  );
};

export default StudentHome;