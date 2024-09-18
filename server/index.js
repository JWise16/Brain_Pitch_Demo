const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { ChatOpenAI } = require("@langchain/openai");
const { InMemoryChatMessageHistory } = require("@langchain/core/chat_history");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,  // Make sure to reference the correct key here
  model: "gpt-4o-mini",
  temperature: 0
});

const messageHistories = {};

const prompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a helpful assistant who remembers all details the user shares with you.`],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (!messageHistories[sessionId]) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

app.post('/api/chat', async (req, res) => {
  const { sessionId, message } = req.body;

  const config = {
    configurable: {
      sessionId: sessionId,
    },
  };

  try {
    const response = await withMessageHistory.invoke(
      {
        input: message,
      },
      config
    );

    res.json({ response: response.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
