const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

exports.existContact = (isPass = false) => {
  return tryCathc(async (req, res, next) => {
    const { userCurrent } = req
    const { id } = req.params

    const isContact = await User.findOne({
      id: userCurrent.id,
      'contacts._id': id
    }).select('contacts')

    console.log(isContact)

    if (!isPass) {
      if (isContact !== null) {
        return next(new AppError('Contact already exist', 404))
      }
    }

    if (isPass) {
      if (isContact === null) {
        return next(new AppError('Contact not exist', 404))
      }
    }

    return next()
  })
}
