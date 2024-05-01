const jwt = require('jsonwebtoken')
const AppError = require('../../../utils/AppError')

exports.userMiddleware = {
  'send message': async (socket, data, next) => {
    const token = socket.handshake.query.key
    if (!token) {
      return next(new AppError('Seccion Invalida', 401))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new AppError('Seccion Invalida', 401))
      }
      return decoded
    })
    next()
  }
}
