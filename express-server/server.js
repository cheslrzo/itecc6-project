const express = require('express');
const cors = require('cors');
const app = express();
const habitRoutes = require('./routes/habits');
const db = require('./db');

app.use(cors());
app.use(express.json());

app.use('/api/habits', habitRoutes);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});