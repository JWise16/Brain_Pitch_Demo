const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");
const { UpstashRedisChatMessageHistory } = require("@langchain/community/stores/message/upstash_redis");

const getModel = () => {
  return new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4",
    temperature: 0,
  });
};

const model = getModel();
const messageHistories = {};

// Define the general prompt for regular chat
const generalPrompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a helpful assistant who remembers all details the user shares with you.`],
  new MessagesPlaceholder("history"),
  ["human", "{question}"],
]);

const chain = generalPrompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: (sessionId) => {
    if (!messageHistories[sessionId]) {
      messageHistories[sessionId] = new UpstashRedisChatMessageHistory({
        sessionId,
        config: {
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        },
      });
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "question",
  historyMessagesKey: "history",
});

const handleChatStream = async (req, res) => {
  const { sessionId, message } = req.body;

  console.log("Received message:", { sessionId, message });

  const config = {
    configurable: {
      sessionId: sessionId,
    },
  };

  try {
    const stream = await withMessageHistory.stream(
      {
        question: message,
      },
      config
    );

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const chunk of stream) {
      res.write(`data: ${chunk.content}\n\n`);
    }

    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New controller function for StudentChatbot
// New controller function for StudentChatbot
const handleStudentChatbot = async (req, res) => {
  // Log to confirm the function is being called
  console.log("handleStudentChatbot has been called");

  const { sessionId, message } = req.body;
  
  console.log("Received message for StudentChatbot:", { sessionId, message });

  // Load context from a text file
  const contextPath = path.join(__dirname, 'context.txt');
  const context = fs.readFileSync(contextPath, 'utf-8');

  // Create a prompt with the loaded context
  const studentPrompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a helpful assistant providing guidance based on the following context:\n\n${context}`],
    new MessagesPlaceholder("history"),
    ["human", "{question}"],
  ]);

  const studentChain = studentPrompt.pipe(model);

  const studentWithMessageHistory = new RunnableWithMessageHistory({
    runnable: studentChain,
    getMessageHistory: (sessionId) => {
      if (!messageHistories[sessionId]) {
        messageHistories[sessionId] = new UpstashRedisChatMessageHistory({
          sessionId,
          config: {
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
          },
        });
      }
      return messageHistories[sessionId];
    },
    inputMessagesKey: "question",
    historyMessagesKey: "history",
  });

  const config = {
    configurable: {
      sessionId: sessionId,
    },
  };

  try {
    const stream = await studentWithMessageHistory.stream(
      {
        question: message,
      },
      config
    );

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const chunk of stream) {
      res.write(`data: ${chunk.content}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { handleChatStream, handleStudentChatbot };
