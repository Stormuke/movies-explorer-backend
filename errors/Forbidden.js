const { FORBIDDEN } = require('../utils/errorConstants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN;
  }
}
module.exports = Forbidden;
