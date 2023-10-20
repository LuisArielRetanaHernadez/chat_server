const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

const bcrypt = require('bcryptjs')

exports.register = tryCathc(async (req, res, next) => {
  const { email } = req.body

  const userFind = await User.findOne({ email })

  if (userFind) {
    return next(new AppError('is email register', 401))
  }

  const passwordHash = await bcrypt.hash(req.body.password, 8)

  const dataDisinfect = {
    ...req.body,
    password: passwordHash,
    passwordConfirm: undefined
  }

  delete dataDisinfect.passwordConfirm

  const user = await User.create(dataDisinfect)

  if (!user) {
    return next(new AppError('error create user', 401))
  }

  user.password = undefined

  return res.status(201).json({
    message: 'user created',
    data: {
      user
    },
    status: 'success'
  })
})
