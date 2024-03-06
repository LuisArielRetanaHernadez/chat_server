const { body } = require('express-validator')

exports.registerUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('lastName')
    .notEmpty()
    .withMessage('LastName is required')
    .isString()
    .withMessage('LastName must be string')
    .isLength({ min: 3 })
    .withMessage('LastName must be at least 3 characters long'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isNumeric()
    .withMessage('Age must be numeric'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirm is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Password confirm must be the same as password'),
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
]

exports.loginUser = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
]
