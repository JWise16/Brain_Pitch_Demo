import React from 'react';
import './StudentChatbot.css';
import ChatBot from '../ChatBot'; // Assuming you have ChatBot.js in the root components folder

const StudentChatbot = () => {
  return (
    <div className="chatbot-page">
      <div className="sidebar">
        <h3>Class Name</h3>
        <ul>
          <li>Module 1</li>
          <li>Exam 1</li>
          <li>Study Notes</li>
        </ul>
      </div>
      <div className="chatbot-container">
        <ChatBot />
      </div>
    </div>
  );
};

export default StudentChatbot;
