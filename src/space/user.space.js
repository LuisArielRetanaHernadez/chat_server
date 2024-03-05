const User = require('../database/models/User.model')
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')

const clients = {}

const verifyConnect = async (socket) => {
  const token = socket.handshake.query.key

  if (!token) {
    throw new AppError('token invalid', 404)
  }

  const decoded = jwt.verify(token, process.env.JW_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      throw new AppError('token invalid', 404)
    }

    return decoded
  })

  const user = await User.exists({ _id: decoded.id })

  if (!user) {
    throw new AppError('user not found', 404)
  }

  if (user) return decoded.id
  return null
}

module.exports = (io) => {
  io.of('/users').use(async (socket, next) => {
    const user = await verifyConnect(socket)
      .then((id) => id)
      .catch((err) => next(err))

    if (!user) return next(new AppError('user not found', 404))
    clients[user] = socket.id

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
      console.log(clients[data.to])
      socket.to(clients[data.to]).emit('message', data)
    })
  })
}
