const express = require('express')

// middleware
const { registerUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register } = require('../controllers/user.controller')

const router = express.Router()

router.post('/', validate(registerUser), register)

module.exports = { routerUser: router }
