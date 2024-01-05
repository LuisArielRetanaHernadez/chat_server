module.exports = (io) => {
  io.of('/users').use((socket, next) => {
    console.log('middleware 1', socket.handshake)
    return next()
  })

  io.of('/users').on('connection', async (socket) => {
    console.log('query: ', socket.handshake.query)
    // if (socket.recovered) {
    //   console.log('recovered ', socket.recovered)
    // } else {
    //   console.log('new connection', socket.recovered)
    // }
    socket.on('message', (message) => {
      console.log(message)
    })
    socket.on('join', (room) => {
      socket.join(room)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
