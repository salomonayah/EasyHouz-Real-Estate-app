
const { body } = require('express-validator/check');
const User = require('../models/user');

const userValidator = [
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
          throw new Error('This phone number address already exists!');
        }
      })
    }),

  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          throw new Error('Email address already exists!');
        }
      })
    })
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 3 })

]


module.exports = userValidator;