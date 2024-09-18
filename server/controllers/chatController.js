require('dotenv').config();
const { ChatOpenAI } = require("@langchain/openai");
const { ChatAnthropic } = require("@langchain/anthropic");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");
const { UpstashRedisChatMessageHistory } = require("@langchain/community/stores/message/upstash_redis");

const getModel = () => {
  return new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0,
  });
  // Or use Anthropic's model
  //return new ChatAnthropic({
  //  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  //  model: "claude-v1",
  //  temperature: 0,
  //});
};

const model = getModel();

const messageHistories = {};

const prompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a helpful assistant who remembers all details the user shares with you.`],
  new MessagesPlaceholder("history"),
  ["human", "{question}"],
]);

const chain = prompt.pipe(model);

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
        question: message, // Ensure 'message' is assigned to 'question'
      },
      config
    );

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const chunk of stream) {
      console.log("Sending chunk:", chunk.content);
      res.write(`data: ${chunk.content}\n\n`); // Send only chunk content
    }

    res.end();
    console.log("Streaming completed");
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChatStream };
