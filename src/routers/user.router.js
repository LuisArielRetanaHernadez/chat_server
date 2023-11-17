const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login, searchUsers } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', validate(registerUser), register)
router.post('/login', validate(loginUser), login)
router.get('/search', auth, searchUsers)

module.exports = { routerUser: router }
