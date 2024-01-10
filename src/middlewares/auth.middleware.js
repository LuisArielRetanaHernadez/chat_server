const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

// jsonwebtoken

const jwt = require('jsonwebtoken')

exports.auth = tryCathc(async (req, res, next) => {
  let token

  if (req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else {
    return next(new AppError('Seccion invalida', 401))
  }

  const userCurrent = jwt.verify(token, process.env.JW_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Seccion invalida', 401))
    }
    return decoded
  })

  req.userCurrent = userCurrent

  next()
})
