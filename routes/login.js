const router = require('express').Router();
const { userValidation, loginValidation } = require('../middlewares/validation');
const { createUser, login } = require('../controlers/users');

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);

module.exports = router;
