const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login, searchUsers, addContact, getContacts } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

// user
router.post('/register', validate(registerUser), register)
router.post('/login', validate(loginUser), login)
// search users
router.get('/search', auth, searchUsers)
// contacts
router.put('/addContact/:id', auth, addContact)
router.get('/contacts/:id', auth, getContacts)
router.get('/contacts', auth, getContacts)

module.exports = { routerUser: router }
