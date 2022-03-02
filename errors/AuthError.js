const { AUTH_ERROR } = require('../utils/errorConstants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
    this.name = 'AuthError';
  }
}

module.exports = AuthError;
