const { NOT_FOUND } = require('../utils/errorConstants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND;
  }
}
module.exports = NotFound;
