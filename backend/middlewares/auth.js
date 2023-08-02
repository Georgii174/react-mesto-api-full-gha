const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorized');
const { JWT_SECRET } = require('../envConfig');

const authMiddleware = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = { authMiddleware };
