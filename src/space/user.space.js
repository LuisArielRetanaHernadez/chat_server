const User = require('../database/models/User.model')
const { sendMessage } = require('../events/sendMessage.event')

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

    socket.on('send message', (message) => {
      sendMessage(message, socket)
    })

    socket.on('disconnect', async () => {
      socket.broadcast.emit('user disconnected', socket.id)
      await User.updateOne({ _id: socket.id }, { isOnline: false })
    })
  })
}
