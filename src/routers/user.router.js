const express = require('express')

// middleware
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')
const validate = require('../middlewares/validate.middleware')

// controller
const { register, login, searchUsers, getUser, verifyEmail, verifyTokenEmail, resendCodeEmail, uploadPhotoProfile } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')
const { verifyUser } = require('../middlewares/verifyUser.middleware')
const { protectUser } = require('../middlewares/protectUser.middleware')

const router = express.Router()

// user
router.post('/register', validate(registerUser), register)
router.post('/upload/image/profile', auth, verifyUser, protectUser, uploadPhotoProfile)
router.post('/verify/email/:token', verifyEmail)
router.post('/login', validate(loginUser), login)
router.get('/search', auth, searchUsers)
router.get('/:id', auth, getUser)

router.get('/verify/email/token/:token', verifyTokenEmail)
router.get('/resend/code/email/:token', resendCodeEmail)

module.exports = { routerUser: router }
