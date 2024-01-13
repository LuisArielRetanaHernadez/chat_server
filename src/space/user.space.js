const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  const clients = []
  io.of('/users').use(async (socket, next) => {
    try {
      const token = socket.handshake.query.key
      const user = verifyToken(token)
      if (!user) {
        return next(new AppError('Invalid token', 401))
      }
      socket.user = user
      return next()
    } catch (error) {
      error.status = 401
      return next(error)
    }
  })
  io.of('/users').on('connection', (socket) => {
    console.log('users connected', socket.user.id)
    const socketInformation = {
      userId: socket.user.id
    }
    if (!clients.find((client) => client.userId === socketInformation.userId)) {
      clients.push(socketInformation)
    }
    socket.on('users online', () => {
      const usersOnline = clients.filter((client) => client.userId !== socketInformation.userId)
      socket.emit('users online', usersOnline)
    })
  })
}
