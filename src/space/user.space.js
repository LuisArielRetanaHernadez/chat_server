const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  io.of('/users').use((socket, next) => {
    try {
      const token = verifyToken(socket.handshake.query.key)
      if (!token) {
        next(new AppError('Invalid token', 401))
      }
      socket.userId = token.id
      return next()
    } catch (error) {
      next(new AppError('Invalid token', 401))
    }
  })
  io.of('/users').on('connection', (socket) => {
    console.log('socket id /user', socket.id)
    console.log('informacion del query: ', socket.handshake.query)
  })
}
