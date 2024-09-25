const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { ChatOpenAI } = require('@langchain/openai');

const getModel = () => {
  return new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4',
    temperature: 0,
  });
};

const model = getModel();

const handleKnowledgeCheck = async (req, res) => {
  const { sessionId, message } = req.body;

  console.log('Received message for Knowledge Check:', { sessionId, message });

  // Load the question prompt
  const questionPromptPath = path.join(__dirname, 'knowledgeCheckPrompt.txt');
  const questionPrompt = fs.readFileSync(questionPromptPath, 'utf-8').trim();

  const messages = [
    { role: 'system', content: `You are a highly intelligent assistant providing feedback on the student's answer based on the given question - please only provide feedback, do not give them the answer - students will have one attempt at this:\n\n${questionPrompt}` },
    { role: 'user', content: message },
  ];

  console.log('Messages to be sent to the model:', JSON.stringify(messages, null, 2));

  try {
    const response = await model.invoke(messages);

    console.log('Model response received:', response);

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    res.write(`data: ${response.content}\n\n`);
    res.end();
  } catch (error) {
    console.error('Knowledge Check error:', error.stack);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process knowledge check.' });
    }
  }
};

// New function to handle getting the prompt content
const getPromptContent = (req, res) => {
  const questionPromptPath = path.join(__dirname, 'knowledgeCheckPrompt.txt');
  try {
    const promptContent = fs.readFileSync(questionPromptPath, 'utf-8');
    res.status(200).send(promptContent);
  } catch (error) {
    console.error('Error reading prompt file:', error);
    res.status(500).json({ error: 'Failed to read prompt content.' });
  }
};

module.exports = { handleKnowledgeCheck, getPromptContent };
