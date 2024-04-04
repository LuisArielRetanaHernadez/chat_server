const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login, searchUsers, getUser, verifyEmail, verifyTokenEmail, resendCodeEmail } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

// user
router.post('/register', validate(registerUser), register)
router.post('/verify/email/:token', verifyEmail)
router.post('/login', validate(loginUser), login)
router.get('/search', auth, searchUsers)
router.get('/:id', auth, getUser)

router.get('/verify/email/token/:token', verifyTokenEmail)
router.get('/resend/code/email/:token', resendCodeEmail)

module.exports = { routerUser: router }
