require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errors');
const route = require('./routes/index');
const login = require('./routes/login');
const DB_ADDRES = require('./utils/config')

const app = express();
const { PORT = 3000, DB_URL, NODE_ENV } = process.env;

app.use(bodyParser.json());
app.use(requestLogger);

mongoose.connect(NODE_ENV === 'production' ? DB_URL : DB_ADDRES, () => {
  console.log('Подключение успешно');
});

app.use(helmet());
app.use(limiter);

app.use(login)
app.use(route);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
