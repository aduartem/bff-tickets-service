const router = require('express').Router();

const userController = require('../controllers/user-controller');

router.get('/role/dev/users', userController.getUsersDev.bind(userController));

module.exports = router;
