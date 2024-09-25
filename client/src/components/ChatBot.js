import React, { useState, useEffect } from 'react';
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

    console.log("Sending message:", input);

    try {
      const response = await fetch('http://localhost:5002/api/chat/student-chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({ sessionId, message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const formatted_chunk = chunk.split('\n')
          .filter(line => line.startsWith('data:'))
          .map(line => line.replace('data: ', ''))
          .join('');
        botMessage += formatted_chunk;
      }

      if (botMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botMessage },
        ]);
      }

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  useEffect(() => {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
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
