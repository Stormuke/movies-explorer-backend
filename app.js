require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errors');
const route = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');

const app = express();
const { PORT = 3000, DB_URL } = process.env;

app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

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
