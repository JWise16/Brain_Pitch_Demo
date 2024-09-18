const express = require('express');
const { handleChatStream } = require('../controllers/chatController');
const router = express.Router();

// Assume that the frontend post call hits the below endpoint 
router.post('/chat/stream', handleChatStream);

module.exports = router;
