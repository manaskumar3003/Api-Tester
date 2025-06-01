// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Sample GET route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GET endpoint!' });
});

// Sample POST route
app.post('/api/echo', (req, res) => {
  const data = req.body;
  res.json({ message: 'Received POST data', data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
