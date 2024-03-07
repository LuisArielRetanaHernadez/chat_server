const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')

const clients = {}

const verifyConnect = async (socket) => {
  const token = socket.handshake.query.key

  if (!token) {
    throw new AppError('token invalid', 401)
  }

  const decoded = jwt.verify(token, process.env.JW_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      throw new AppError('token invalid', 401)
    }

    return decoded
  })

  const user = await User.findOne({ _id: decoded.id }, { username: 1, name: 1, lastName: 1 })

  if (!user) {
    throw new AppError('user not found', 401)
  }

  if (user) {
    return {
      id: decoded.id,
      username: user.username,
      name: user.name,
      lastName: user.lastName
    }
  }

  return null
}

module.exports = (io) => {
  io.of('/users').use(async (socket, next) => {
    const user = await verifyConnect(socket)
      .then((id) => id)
      .catch((err) => next(err))

    if (!user) {
      return next(new AppError('user not found', 401))
    }
    if (clients[user.id]) {
      return next()
    }
    clients[user.id] = {
      socketID: socket.id,
      name: user.name,
      lastName: user.lastName,
      username: user.username
    }

    socket.userID = user.id

    next()
  })
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
      socket.to(clients[data.to].socketID).emit('message', {
        message: data.message,
        to: data.to,
        username: clients[socket.userID].username
      })
    })
  })
}
