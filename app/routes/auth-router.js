const router = require('express').Router();

const authController = require('../controllers/auth-controller');

router.post('/auth', authController.login.bind(authController));

module.exports = router;
