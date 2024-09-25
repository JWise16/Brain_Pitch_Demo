const express = require('express');
const { handleChatStream, handleStudentChatbot } = require('../controllers/chatController');
const { handleKnowledgeCheck, getPromptContent } = require('../controllers/knowledgeCheckController'); // Import the new controller

const router = express.Router();

// Existing routes
router.post('/chat/stream', handleChatStream);
router.post('/student-chatbot', handleStudentChatbot);
router.post('/knowledge-check', handleKnowledgeCheck);

// New route to get prompt content
router.get('/prompt-content', getPromptContent);

module.exports = router;
