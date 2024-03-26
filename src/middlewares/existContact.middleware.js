const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

exports.existContact = (isPass = false) => {
  return tryCathc(async (req, res, next) => {
    const { userCurrent } = req
    const { id } = req.params

    const isContact = await User.findOne({
      _id: id,
      'contacts._id': userCurrent._id
    }).select('contacts')

    if (!isPass) {
      if (isContact === null) {
        return next(new AppError('contact does not exist', 401))
      }
    }

    return next()
  })
}
