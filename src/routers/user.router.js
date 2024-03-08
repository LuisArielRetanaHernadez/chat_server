const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login, searchUsers, addContact } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register', validate(registerUser), register)
router.post('/login', validate(loginUser), login)
router.get('/search', auth, searchUsers)
router.put('/addContact/:id', auth, addContact)

module.exports = { routerUser: router }
