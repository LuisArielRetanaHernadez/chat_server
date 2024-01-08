const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  io.of('/users').use(async (socket, next) => {
    const token = verifyToken(socket.handshake.query.token)
    if (!token) {
      return next(new AppError('Invalid token', 401))
    }
    console.log('token: ', token)
    socket.user = token.id
    return next()
  })

  io.of('/users').on('connection', async (socket) => {
    console.log('informacion del query: ', socket.handshake.query)
  })
}
