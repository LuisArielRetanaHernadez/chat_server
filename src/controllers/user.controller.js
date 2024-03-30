const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

const jsonwebtoken = require('jsonwebtoken')

const bcrypt = require('bcrypt')

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

  const token = await jsonwebtoken.sign({ id: user._id }, process.env.JW_SECRET, { expiresIn: process.env.JWT_EXPIRE })

  delete user.password

  return res.status(201).json({
    message: 'user created',
    data: {
      user,
      token
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
