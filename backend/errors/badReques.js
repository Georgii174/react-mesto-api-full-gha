const statuses = require('./const');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = BadRequestError;
    this.statusCode = statuses.statusCodes.badRequest;
  }

  static sendError({ res, message, payload }) {
    res.status(statuses.statusCodes.badRequest).send({ message, payload });
  }
}

module.exports = { BadRequestError };
