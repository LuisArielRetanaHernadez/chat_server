const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

const jsonwebtoken = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const { searchUser } = require('../utils/searchContact')

exports.register = tryCathc(async (req, res, next) => {
  const { Email } = req.body

  const userFind = await User.findOne({ Email })

  if (userFind) {
    return next(new AppError('is email register', 401))
  }

  const salt = await bcrypt.genSalt(8)
  const passwordHash = await bcrypt.hash(req.body.Password, salt)

  const dataDisinfect = {
    ...req.body,
    Password: passwordHash,
    PasswordConfirm: undefined
  }

  delete dataDisinfect.passwordConfirm

  const user = await User.create(dataDisinfect)

  if (!user) {
    return next(new AppError('error create user', 401))
  }

  delete user.Password

  return res.status(201).json({
    message: 'user created',
    data: {
      user
    },
    status: 'success'
  })
})

exports.login = tryCathc(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new AppError('is email register', 401))
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return next(new AppError('is email register', 401))
  }

  const token = await jsonwebtoken.sign({ id: user._id }, process.env.SECRET_SECRET, { expiresIn: process.env.SECRET_EXPIRE })

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

exports.searchUsers = tryCathc(async (req, res, next) => {
  const { search } = req.query
  const { userCurrent } = req

  const usersFind = await searchUser(userCurrent, search)

  return res.status(200).json({
    message: 'search users',
    data: {
      usersFind
    }
  })
})
