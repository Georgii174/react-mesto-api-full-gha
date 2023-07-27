const { messages, statusCodes } = require('../errors/const');

const errorMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message = '' } = error;

  if (error.code === 11000) {
    res.status(statusCodes.conflict).send({ message: messages.user.conflictEmail });
    return;
  }
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorMiddleware };
