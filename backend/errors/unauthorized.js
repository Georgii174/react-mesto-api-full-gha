const { statusCodes } = require('./const');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = statusCodes.unauthorized;
  }
}

module.exports = { UnauthorizedError };
