
const { body } = require('express-validator/check');

const announcementValidator = [
  body('title')
    .exists({ checkNull: true })
    .withMessage('Field is required')
    .trim()
    .isLength({ min: 5 }),

  body('price')
    .exists({ checkNull: true })
    .withMessage('Field is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

  body('location')
    .exists({ checkNull: true })
    .withMessage('Field is required')
    .trim()
    .isLength({ min: 5 }),

  body('advantage')
    .exists({ checkNull: true })
    .withMessage('Field is required')
    .trim()
    .isLength({ min: 5 }),

  body('description')
    .exists({ checkNull: true })
    .withMessage('Field is required')
    .trim()
    .isLength({ min: 5 })
]



module.exports = announcementValidator;