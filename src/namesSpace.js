const userSpace = require('./space/user.space')

const namesSpace = (io, socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args)
  })
  userSpace(io)
}

module.exports = namesSpace
