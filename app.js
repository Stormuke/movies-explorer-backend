require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
const route = require('./routes/index');
const { loginValidation, userValidation } = require('./middlewares/validation');
const { createUser, login } = require('./controlers/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', userValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);

app.use(route);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', () => {
  console.log('Подключение успешно');
});
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
