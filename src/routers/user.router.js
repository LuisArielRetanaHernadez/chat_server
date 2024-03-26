const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login, searchUsers, addContact, getContacts, getContact, getUser } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')
const { existContact } = require('../middlewares/existContact.middleware')

const router = express.Router()

// user
router.post('/register', validate(registerUser), register)
router.post('/login', validate(loginUser), login)
router.get('/:id', auth, getUser)
// search users
router.get('/search', auth, searchUsers)
// contacts
router.put('/addContact/:id', auth, existContact(false), addContact)
router.get('/contacts/:id', auth, getContact)
router.get('/contacts', auth, existContact(false), getContacts)

module.exports = { routerUser: router }
