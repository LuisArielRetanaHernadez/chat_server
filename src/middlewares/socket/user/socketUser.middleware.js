const jwt = require('jsonwebtoken')
const AppError = require('../../../utils/AppError')

exports.userMiddleware = {
  'send message': async (socket, data, next) => {
    const token = socket.handshake.query.token
    if (!token) {
      return next(new AppError('no token', 404))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new AppError('token invalid', 404))
      }
      return decoded
    })
    next()
  }
}
