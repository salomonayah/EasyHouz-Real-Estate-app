const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('fullname')
      .trim()
      .not()
      .isEmpty(),

    body('phonenumber')
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return User.findOne({ phonenumber: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('This phone number address already exists!');
          }
        });
      }),

    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email address already exists!');
          }
        });
      })
      .normalizeEmail(),

    body('password')
      .trim()
      .isLength({ min: 3 })

  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
