import React from 'react';
import './TeacherControls.css';

const TeacherControls = () => {
  return (
    <div className="controls-container">
      <h2>Controls</h2>
      <div className="control">
        <span>Reading Summaries</span>
        <input type="checkbox" />
      </div>
      <div className="control">
        <span>Socratic Method</span>
        <input type="checkbox" />
      </div>
      <div className="control">
        <p>Student usage</p>
        <p>(alphabetical class list)</p>
      </div>
    </div>
  );
};

export default TeacherControls;
