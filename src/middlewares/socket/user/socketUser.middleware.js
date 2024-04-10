const jwt = require('jsonwebtoken')
const AppError = require('../../../utils/AppError')
const verifyToken = require('../../../utils/jwt/verifyToken')
const ListChat = require('../../../database/models/ListChat')

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
  },
  'list chat': async (socket, data, next) => {
    const token = socket.handshake.query.key
    const decoded = verifyToken(token)

    const listChat = await ListChat.findOne({ user: decoded.id })
    if (listChat === null) {
      await ListChat.create({ user: decoded.id })
    }
    next()
  }
}
