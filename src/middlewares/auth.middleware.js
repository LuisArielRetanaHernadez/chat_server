const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

// jsonwebtoken

const jwt = require('jsonwebtoken')

exports.auth = tryCathc((req, res, next) => {
  let token

  if (req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else {
    return next(new AppError('Seccion invalida', 401))
  }

  const userCurrent = jwt.verify(token, process.env.SECRET_SECRET)

  if (!userCurrent) {
    return next(new AppError('Seccion invalida', 401))
  }

  req.userCurrent = userCurrent

  next()
})
