const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  io.of('/users').use((socket, next) => {
    try {
      const token = verifyToken(socket.handshake.query.key)
      socket.userId = token.id
      return next()
    } catch (error) {
      const err = new AppError('not authorized')
      err.data = { status: 401 }
      next(err)
    }
  })
  io.of('/users').on('connection', (socket) => {
    socket.on('users online', () => {
      const users = io.of('/users').sockets
      socket.emit('users online', users)
    })
  })
}
