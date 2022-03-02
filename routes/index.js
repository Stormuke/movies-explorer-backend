const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../errors/NotFound');

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFound('Тут пусто'));
});

module.exports = router;
