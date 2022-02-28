const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  const { moviesList } = {};
  return Movie.find(moviesList)
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании карточки фильма');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id;
  return Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Фильм с указанным _id не найдена');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.status(200).send(movie));
      } else {
        throw new Forbidden('Вы пытаетесь удалить чужую карточку');
      }
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
