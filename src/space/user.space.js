const User = require('../database/models/User.model')

const clients = []

module.exports = (io) => {
  io.of('/users').on('connection', (socket) => {
    socket.on('users online', async () => {
      const usersOnline = await User.find({ isOnline: true })
      socket.emit('users online', usersOnline)
    })
    socket.on('isUserOnline', async (userId) => {
      const isUserOnline = await User.findOne({ _id: userId, isOnline: true })
      socket.emit('isUserOnline', isUserOnline)
    })

    socket.on('send message', (data) => {
      console.log(data)
      socket.to(clients[0].socketID).emit('message', data)
    })
  })
}
