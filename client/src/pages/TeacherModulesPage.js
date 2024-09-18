import React from 'react';
import TeacherModules from '../components/Teacher/TeacherModules';
import TeacherNavbar from '../components/Teacher/TeacherNavbar';
import '../styles/TeacherPages.css'; // Double-check if necessary to import global styles

const TeacherModulesPage = () => {
  return (
    <div className="teacher-page-container">
      <TeacherNavbar />
      <TeacherModules />
    </div>
  );
};

export default TeacherModulesPage;
