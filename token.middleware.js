const jwt = require('jsonwebtoken');
const { secret_key } = require('./config');

module.exports = (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
    try {
      const { uid } = jwt.verify(token, secret_key);
      req.userId = uid;
      next();
    } catch (error) {
      res.status(401).json({
        status: 'failed',
        message: 'Invalid token',
      });
    }
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized user',
    });
  }
};
