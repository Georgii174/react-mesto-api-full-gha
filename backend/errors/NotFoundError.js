const statuses = require('./const');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statuses.statusCodes.notFound;
  }

  static sandError({ res, message }) {
    res.status(statuses.statusCodes.notFound).send({ message });
  }
}

module.exports = { NotFoundError };
