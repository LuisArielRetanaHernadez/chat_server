// express
const express = require('express')

// middlewares
const validate = require('../middlewares/validate.middleware')
const { auth } = require('../middlewares/auth.middleware')

// middlewares -> expressValidator
const { registerUser, loginUser } = require('../middlewares/expressValidator/user.body')

// middlewares -> verifyUser
const { verifyUser } = require('../middlewares/verifyUser.middleware')

// middlewares -> protectUser
const { protectUser } = require('../middlewares/protectUser.middleware')

// controller (user)
const {
  register,
  login,
  searchUsers,
  getUser,
  verifyEmail,
  verifyTokenEmail,
  resendCodeEmail,
  uploadPhotoProfile,
  verifyUserAuthAndId
} = require('../controllers/user.controller')

const router = express.Router()

// user
router.post('/register', validate(registerUser), register)
router.post('/upload/image/profile/:id', auth, verifyUser, protectUser, uploadPhotoProfile)
router.post('/verify/email/:token', verifyEmail)
router.post('/login', validate(loginUser), login)
router.get('/search', auth, searchUsers)
router.get('/:id', auth, getUser)

router.get('/verify/email/token/:token', verifyTokenEmail)
router.get('/resend/code/email/:token', resendCodeEmail)

router.get('/verify/user/:id', auth, verifyUser, verifyUserAuthAndId)

module.exports = { routerUser: router }
