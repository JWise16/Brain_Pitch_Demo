import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherHomePage from './pages/TeacherHomePage';
import StudentHomePage from './pages/StudentHomePage';
import TeacherModulesPage from './pages/TeacherModulesPage';
import TeacherControlsPage from './pages/TeacherControlsPage';
import TeacherStudentViewPage from './pages/TeacherStudentViewPage';
import StudentChatbotPage from './pages/StudentChatbotPage';
import KnowledgeCheck from './components/Student/KnowledgeCheck'; // Import the KnowledgeCheck component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/teacher/home" element={<TeacherHomePage />} />
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/teacher/modules" element={<TeacherModulesPage />} />
        <Route path="/teacher/controls" element={<TeacherControlsPage />} />
        <Route path="/teacher/student-view" element={<TeacherStudentViewPage />} />
        <Route path="/student/chatbot" element={<StudentChatbotPage />} />
        <Route path="/student/knowledge-check" element={<KnowledgeCheck />} />
      </Routes>
    </Router>
  );
}

export default App;
