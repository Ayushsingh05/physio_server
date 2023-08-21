const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const { secret_key, userDetails } = require('./config');
const TokenMiddleware = require('./token.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/login_v1', (req, res) => {
  const token = jwt.sign({ uid: userDetails.uid }, secret_key, {
    expiresIn: '5d',
  });

  const { uid, password } = req.body;
  if (uid === userDetails.uid && password === userDetails.password) {
    return res.json({ token });
  }

  res.status(401).json({ status: 'failed', message: 'Wrong credentials.' });
});

app.get('/api/dashboard', TokenMiddleware, (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Dashboard' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
