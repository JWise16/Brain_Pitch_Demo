import React from 'react';
import './TeacherModules.css';

const TeacherModules = () => {
  return (
    <div className="modules-container">
      <h2>Modules</h2>
      <ul className="modules-list">
        <li className="module">
          <span>Module 1</span>
        </li>
        <li className="module">
          <span>Module 2</span>
          <ul className="lessons-list">
            <li className="lesson">Lesson 1</li>
            <li className="lesson">
              <span>Lesson 2</span>
              <div className="lesson-details">
                <p>Class info here</p>
                <p>Course controls</p>
                <p>Uploads</p>
              </div>
            </li>
          </ul>
        </li>
        <li className="module">
          <span>Module 3</span>
        </li>
      </ul>
    </div>
  );
};

export default TeacherModules;
