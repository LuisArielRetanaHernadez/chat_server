const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const verifyToken = require('../utils/verifyToken')

module.exports = (io) => {
  io.of('/users').on('connection', (socket) => {
    console.log('id socket ', socket.id)
    socket.on('users online', () => {
      const users = io.of('/users').sockets
      socket.emit('users online', users)
    })
  })
}
