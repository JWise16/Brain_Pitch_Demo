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
      const response = await fetch('http://localhost:5001/api/chat/stream', {
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
      let botMessage = ""; // To concatenate the chunks

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        console.log("Received chunk:", chunk);
        botMessage += chunk; // Concatenate the chunk directly
      }

      // Clean up the message before setting the state
      botMessage = botMessage.replace(/^\s*data:\s*/gm, '').trim();
      console.log("Concatenated message:", botMessage);

      // Update state with the concatenated and cleaned message
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
