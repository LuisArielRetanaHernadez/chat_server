module.exports = (io) => {
  const clients = []
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
