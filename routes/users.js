const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controlers/users');
const { userDataValidation } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', userDataValidation, updateUser);

module.exports = router;
