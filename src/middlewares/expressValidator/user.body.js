const { body } = require('express-validator')

exports.registerUser = [
  body('Name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('LastName')
    .notEmpty()
    .withMessage('LastName is required')
    .isString()
    .withMessage('LastName must be string')
    .isLength({ min: 3 })
    .withMessage('LastName must be at least 3 characters long'),
  body('Age')
    .notEmpty()
    .withMessage('Age is required')
    .isNumeric()
    .withMessage('Age must be numeric'),
  body('Email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('Password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isAlphanumeric()
    .withMessage('Password must be alphanumeric'),
  body('Password confirm')
    .notEmpty()
    .withMessage('Password confirm is required')
    .custom((value, { req }) => value === req.body.Password)
    .withMessage('Password confirm must be the same as password'),
  body('Username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
]
