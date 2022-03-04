const { DEFAULT_ERROR } = require('../utils/errorConstants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === DEFAULT_ERROR ? 'На сервере произошла ошибка' : message });
  next();
};
