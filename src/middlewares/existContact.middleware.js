const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

exports.existContact = (isPass) => {
  return tryCathc(async (req, res, next) => {
    const { userCurrent } = req
    const { id } = req.params

    const isContact = await User.findOne({
      _id: id,
      'contacts._id': userCurrent._id
    }).select('contacts')

    if (!isContact) {
      if (isPass) {
        return next()
      }

      return next(new AppError('contact does not exist', 401))
    }

    return next()
  })
}
