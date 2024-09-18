import React from 'react';
import TeacherControls from '../components/Teacher/TeacherControls';
import TeacherNavbar from '../components/Teacher/TeacherNavbar';
import '../styles/TeacherPages.css'; // Double-check if necessary to import global styles

const TeacherControlsPage = () => {
  return (
    <div className="teacher-page-container">
      <TeacherNavbar />
      <TeacherControls />
    </div>
  );
};

export default TeacherControlsPage;
