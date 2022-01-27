const express = require('express');
const authController = require('../controllers/auth');
const userValidator = require('../validators/user-validator');
const router = express.Router();

router.post('/signup', userValidator,  authController.signup);

router.post('/login', authController.login);

module.exports = router;
