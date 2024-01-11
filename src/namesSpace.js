const namesSpace = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.onAny((event, ...args) => {
      console.log(event, args);
    })
  })
}

module.exports = namesSpace
