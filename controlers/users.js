const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFound = require('../errors/NotFound');
const ConflictError = require('../errors/ConcflictError');

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    throw new NotFound('Пользователь не найден');
  })
  .then((user) => res.status(200).send({ user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new ValidationError('Переданы некорректные данные');
    } else if (err.name === 'NotFoundError') {
      throw new NotFound('Пользователь не найден');
    } else {
      next(err);
    }
  })
  .catch(next);

const updateUser = (req, res, next) => {
  const { name } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name }, { new: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Переданы некорректные данные при обновлении профиля');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании пользователя');
      } else if (err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser, createUser, updateUser, login,
};
