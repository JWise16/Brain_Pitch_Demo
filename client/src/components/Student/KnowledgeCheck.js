import React, { useState, useEffect } from 'react';
import './KnowledgeCheck.css';

const KnowledgeCheck = () => {
  const [promptContent, setPromptContent] = useState('');
  const [feedback, setFeedback] = useState('');
  const [input, setInput] = useState('');
  const [sessionId] = useState('knowledge-check-session');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fetch the prompt content on component mount
    const fetchPromptContent = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/prompt-content');
        const data = await response.text(); // Assuming the response is plain text
        setPromptContent(data);
      } catch (error) {
        console.error('Error fetching prompt content:', error);
      }
    };

    fetchPromptContent();
  }, []);

  const sendMessage = async () => {
    if (!input) return;

    console.log("Sending message:", input);

    try {
      const response = await fetch('http://localhost:5002/api/chat/knowledge-check', {
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
      let botResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        botResponse += chunk.split('\n').filter(line => line.startsWith('data:')).map(line => line.replace('data: ', '')).join('');
      }

      setFeedback(botResponse);

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Request error:", error);
    }

    // Hide the submit button and retain the input
    setSubmitted(true); 
  };

  return (
    <div className="knowledge-check-container">
      <div className="prompt-content">
        <h3>Question:</h3>
        <p>What is one of Socrates main points in the aplogy?</p>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your answer..."
        readOnly={submitted} // Disable input if submitted
      />
      {!submitted && (
        <button onClick={sendMessage}>
          Submit
        </button>
      )}
      <div className="feedback-content">
        <h3>Feedback:</h3>
        <p>{feedback}</p>
      </div>
    </div>
  );
};

export default KnowledgeCheck;
