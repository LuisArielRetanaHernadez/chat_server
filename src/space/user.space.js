const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  io.of('/users').use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token
      const user = await verifyToken(token)
      if (!user) {
        return next(new AppError('Invalid token', 401))
      }
      socket.user = user
      next()
    } catch (error) {
      error.status = 401
      next(error)
    }
  })
  io.of('/users').on('connection', (socket) => {
    console.log('id socket ', socket.id)
    socket.on('users online', () => {
    })
  })
}
