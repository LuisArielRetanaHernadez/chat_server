const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

exports.verifyUser = tryCathc(async (req, res, next) => {
  const { userCurrent } = req
  const user = User.findById(userCurrent.id)
  if (!user) {
    return next(new AppError('User Unknown', 401))
  }
  next()
})
