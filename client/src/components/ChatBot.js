import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState('default-session');

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        sessionId,
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const messageBox = document.getElementById('messageBox');
    messageBox.scrollTop = messageBox.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div id="messageBox" className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        className="chatbot-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button className="chatbot-send" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatBot;
