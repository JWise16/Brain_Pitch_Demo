import React, { useState, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = ({ messages, onSendMessage, sessionId = 'default-session' }) => {
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;

    // Add the user's message to the messages with sender: 'user'
    onSendMessage({ sender: 'user', text: input }); // Use the parent's function to add the user's message

    setInput(''); // Clear input field after sending

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
       
        botMessage += chunk; // Accumulate bot response chunks
      }

      botMessage = botMessage.replace(/^\s*data:\s*/gm, '').trim(); // Clean up the message
      console.log("Bot message:", botMessage);
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

      // Add the bot's message to the messages with sender: 'bot'
      onSendMessage({ sender: 'bot', text: botMessage });
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  // Auto scroll to the latest message
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
