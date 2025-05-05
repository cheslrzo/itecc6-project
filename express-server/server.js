const express = require('express');
const cors = require('cors');
const habitsRouter = require('./routes/habits');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/habits', habitsRouter);

app.get('/', (req, res) => {
  res.send('Habit Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
