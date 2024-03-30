const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

exports.existContact = (isPass = false) => {
  return tryCathc(async (req, res, next) => {
    const { userCurrent } = req
    const { id } = req.params

    const user = await User.findOne({ _id: userCurrent.id })

    const isContact = user.contacts.find(
      (contact) => contact._id.toString() === id.toString()
    )

    if (!isPass) {
      if (isContact !== undefined) {
        return next(new AppError('Contact already exist', 404))
      }
    }

    if (isPass) {
      if (isContact === undefined) {
        return next(new AppError('Contact not exist', 404))
      }
    }

    return next()
  })
}
