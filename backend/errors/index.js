const { messages, statusCodes } = require('./const');
const { BadRequestError } = require('./badReques');
const { NotFoundError } = require('./NotFoundError');
const { UnauthorizedError } = require('./unauthorized');
const { ForbiddenError } = require('./ForbiddenError');

const handleDefaultError = (res) => {
  res.status(statusCodes.default).send({ message: messages.common.serverError });
};

module.exports = {
  handleDefaultError, NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError,
};
