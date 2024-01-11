const userSpace = require('./space/user.space')

const namesSpace = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
    console.log('socket id / ', socket.id)
    socket.onAny((event, ...args) => {
      console.log(event, args)
    })
  })
  userSpace(io)
}

module.exports = namesSpace
