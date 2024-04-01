const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

const jsonwebtoken = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const CheckEmail = require('../database/models/CheckEmail.model')
const { arrayDeBytesgenerateCode } = require('../utils/generateCode')

exports.register = tryCathc(async (req, res, next) => {
  const { email } = req.body

  const userFind = await User.findOne({ email })

  if (userFind) {
    return next(new AppError('is email register', 401))
  }

  const salt = await bcrypt.genSalt(8)
  const passwordHash = await bcrypt.hash(req.body.password, salt)

  const dataDisinfect = {
    ...req.body,
    password: passwordHash,
    PasswordConfirm: undefined
  }

  delete dataDisinfect.passwordConfirm

  const user = await User.create(dataDisinfect)

  if (!user) {
    return next(new AppError('error create user', 401))
  }

  const token = await jsonwebtoken.sign({ id: user._id }, process.env.JW_SECRET, { expiresIn: '1h' })
  const code = arrayDeBytesgenerateCode()

  const codeCrypt = await bcrypt.hash(code, salt)

  const verifyEmail = await CheckEmail.create({
    user: user._id,
    email,
    code: codeCrypt,
    token
  })

  if (!verifyEmail) {
    return next(new AppError('error create user', 401))
  }

  delete user.password

  return res.status(201).json({
    message: 'user created',
    data: {
      user,
      url: `http://localhost:5173/email/verify/${token}`
    },
    status: 'success'
  })
})

exports.login = tryCathc(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return next(new AppError('invalide crendetials', 401))
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return next(new AppError('invalide crendetials', 401))
  }

  const token = await jsonwebtoken.sign({ id: user._id }, process.env.JW_SECRET, { expiresIn: process.env.JWT_EXPIRE })

  // actualizar el campo isOnline a true
  await user.updateOne({ isOnline: true })

  await user.save()

  user.password = undefined

  return res.status(200).json({
    message: 'user login',
    data: {
      user,
      token
    },
    status: 'success'
  })
})

exports.checkEmail = tryCathc(async (req, res, next) => {
  const { token } = req.params
  const { code } = req.body

  const verifyToken = await jsonwebtoken.verify(token, process.env.JW_SECRET)

  if (!verifyToken) {
    return next(new AppError('token invalid', 401))
  }

  const checkEmail = await CheckEmail.findOne({ token, status: 'pending', user: verifyToken.id })

  const isMatch = await bcrypt.compare(code, checkEmail.code)

  if (!isMatch) {
    return next(new AppError('code invalid', 401))
  }

  if (!checkEmail) {
    return next(new AppError('token invalid', 401))
  }

  await checkEmail.updateOne({ status: 'verified' })

  await checkEmail.save()

  const user = await User.findOne({ _id: verifyToken.id, email: checkEmail.email })

  if (!user) {
    return next(new AppError('user not found', 401))
  }

  await user.updateOne({ status: 'active' })

  await user.save()

  await CheckEmail.deleteMany({ email: checkEmail.email, status: 'pending' })

  await User.deleteMany({ email: checkEmail.email, status: 'pending' })

  return res.status(200).json({
    message: 'email verified',
    data: {
      user
    },
    status: 'success'
  })
})

exports.getUser = tryCathc(async (req, res, next) => {
  const { userCurrent } = req
  const { id } = req.params

  const user = await User.findOne({ _id: id })
    .select('-Password')

  if (!user === null) {
    return next(new AppError('user not found', 401))
  }

  const contact = await User.exists({ _id: userCurrent.id, contacts: id })

  console.log('contact: ', contact)

  if (contact !== null && !contact) {
    return next(new AppError('user not found', 401))
  }

  return res.status(200).json({
    message: 'user found',
    data: {
      user,
      isContact: contact !== null
    }
  })
})

exports.searchUsers = tryCathc(async (req, res, next) => {
  const { user } = req.query
  console.log('user: ', req.query)

  const usersFind = await User.find({
    $or: [
      { name: { $regex: user, $options: 'i' } },
      { email: { $regex: user, $options: 'i' } },
      { username: { $regex: user, $options: 'i' } }
    ]
  }).select('-Password')

  if (!usersFind) {
    return res.status(200).json({
      message: 'no users found',
      data: []
    })
  }

  return res.status(200).json({
    message: 'search users',
    data: {
      usersFind
    }
  })
})
