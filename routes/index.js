const router = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');


router.use(loginRouter);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFound('Тут пусто'));
});

module.exports = router;
