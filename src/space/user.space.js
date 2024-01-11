const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  io.of('/users').use(async (socket, next) => {
    const token = verifyToken(socket.handshake.query.key)
    if (!token) {
      return next(new AppError('Invalid token', 401))
    }
    socket.userId = token.id
    return next()
  })

  io.of('/users').on('connection', (socket) => {
    console.log('socket id ', socket.userId)
    console.log('informacion del query: ', socket.handshake.query)
  })
}
