import React from 'react';
import TeacherStudentView from '../components/Teacher/TeacherStudentView';
import TeacherNavbar from '../components/Teacher/TeacherNavbar';
import '../styles/TeacherPages.css'; // Double-check if necessary to import global styles

const TeacherStudentViewPage = () => {
  return (
    <div className="teacher-page-container">
      <TeacherNavbar />
      <TeacherStudentView />
    </div>
  );
};

export default TeacherStudentViewPage;
