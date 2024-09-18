const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow only the React app to make requests
  methods: ['GET', 'POST'], // Allow both GET and POST methods
  allowedHeaders: ['Content-Type', 'Accept'] // Allow necessary headers
}));

app.use(bodyParser.json());

app.use('/api', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
