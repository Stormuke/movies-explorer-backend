require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const login = require('./routes/login');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errors');
const route = require('./routes/index');

const app = express();
const { PORT = 3000, DB_URL } = process.env;

app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(login);

app.use(auth);

app.use(route);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_URL, () => {
  console.log('Подключение успешно');
});
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
