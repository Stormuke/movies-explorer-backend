const router = require('express').Router();
const { userValidation, loginValidation } = require('../middlewares/validation');
const { createUser, login } = require('../controlers/users');

router.use('/signup', userValidation, createUser);
router.use('/signin', loginValidation, login);

module.exports = router;
