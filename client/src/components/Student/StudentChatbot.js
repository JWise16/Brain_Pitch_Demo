import React, { useState } from 'react';
import './StudentChatbot.css';
import ChatBot from '../ChatBot'; // Adjust this import path according to your structure

const StudentChatbot = () => {
  const [activeChat, setActiveChat] = useState('Module 1'); // Track which chat is active
  const [chatHistories, setChatHistories] = useState({
    'Module 1': [],
    'Exam 1': [],
    'Study Notes': []
  });

  // Function to handle sending a new message
  const handleSendMessage = (newMessage) => {
    setChatHistories(prevHistories => ({
      ...prevHistories,
      [activeChat]: [...prevHistories[activeChat], newMessage],
    }));
  };

  // Function to handle sidebar click and set the active chat
  const handleSidebarClick = (module) => {
    setActiveChat(module); // Set the clicked chat as the active one
  };

  return (
    <div className="chatbot-page">
      <div className="sidebar">
        <h3>Class Name</h3>
        <ul>
          <li
            className={activeChat === 'Module 1' ? 'active' : ''} // Apply 'active' class if it's the selected chat
            onClick={() => handleSidebarClick('Module 1')}
          >
            Module 1
          </li>
          <li
            className={activeChat === 'Exam 1' ? 'active' : ''} // Same for other items
            onClick={() => handleSidebarClick('Exam 1')}
          >
            Exam 1
          </li>
          <li
            className={activeChat === 'Study Notes' ? 'active' : ''} 
            onClick={() => handleSidebarClick('Study Notes')}
          >
            Study Notes
          </li>
        </ul>
      </div>

      <div className="chatbot-container">
        <ChatBot
          messages={chatHistories[activeChat]} // Pass the correct chat history based on the selected chat
          onSendMessage={handleSendMessage} // Handle new messages
        />
      </div>
    </div>
  );
};

export default StudentChatbot;
