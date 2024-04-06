const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

exports.protectUser = tryCathc(async (req, res, next) => {
  const { userCurrent } = req
  const { id } = req.params

  if (userCurrent.id !== id) {
    return next(new AppError('error protected error', 401))
  }
  return next()
})
