const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login } = require('../controllers/user.controller')

const router = express.Router()

router.post('/', validate(registerUser), register)
router.post('/login', validate(loginUser), login)

module.exports = { routerUser: router }
