const { Joi, celebrate } = require('celebrate');

const linkRegularExpression = /(http:\/\/|https:\/\/)(www)*[a-z0-9\S]*/;

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegularExpression),
    trailerLink: Joi.string().required().pattern(linkRegularExpression),
    thumbnail: Joi.string().required().pattern(linkRegularExpression),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});

module.exports = {
  loginValidation,
  userValidation,
  userDataValidation,
  movieValidation,
  movieIdValidation,
};
