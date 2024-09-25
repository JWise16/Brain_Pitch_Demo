const express = require('express');
const { handleChatStream, handleStudentChatbot } = require('../controllers/chatController');
const router = express.Router();

// Existing route
router.post('/chat/stream', handleChatStream);

// New route for StudentChatbot
router.post('/student-chatbot', handleStudentChatbot);

module.exports = router;
