const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://127.0.0.1:27017/pwaproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.get('/', (req, res) => {
    res.send('Backend Connected to MongoDB');
  });
});

app.use(cors());
app.use(express.json());

const ConnectionLog = mongoose.model('ConnectionLog', {
  timestamp: Date,
});

const TextEntry = mongoose.model('TextEntry', {
  text: String,
});

app.use((req, res, next) => {
  const logEntry = new ConnectionLog({ timestamp: new Date() });
  logEntry.save();
  next();
});

app.post('/submit-text', async (req, res) => {
  try {
    const { text } = req.body;
    const textEntry = new TextEntry({ text });
    await textEntry.save();
    res.status(201).json({ message: 'Text entry saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the text entry' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
