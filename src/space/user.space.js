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
    const socketInformation = {
      userId: socket.user.id
    }
    if (!clients.find((client) => client.userId === socketInformation.userId)) {
      clients.push(socketInformation)
    }
    socket.on('users online', () => {
      socket.emit('users online', clients)
    })
    socket.on('isUserOnline', (userId) => {
      const isUserOnline = clients.some((client) => client.userId === userId)
      socket.emit('isUserOnline', isUserOnline)
    })
  })
}
