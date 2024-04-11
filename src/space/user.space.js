const ListChat = require('../database/models/ListChat')
const Message = require('../database/models/Menssage.model')
const User = require('../database/models/User.model')
const { userMiddleware } = require('../middlewares/socket/user/socketUser.middleware')
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

  const user = await User.findOne({ _id: decoded.id, isOnline: true }, { username: 1, name: 1, lastName: 1 })

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
    console.log('users connects ', clients)
    socket.use((event, next) => {
      console.log('pasara el middleware??')
      if (userMiddleware[event[0]] !== undefined) {
        console.log('si esta el middleware')
        userMiddleware[event[0]](socket, event[1], next)
      }
    })
    socket.on('users online', async () => {
      const usersOnline = await User.find({ isOnline: true })
      socket.emit('users online', usersOnline)
    })

    socket.on('isUserOnline', async (userId) => {
      const isUserOnline = Boolean(clients[userId])
      socket.emit('isUserOnline', isUserOnline)
    })

    socket.on('send message', (data) => {
      socket.to(clients[data.to]?.socketID).emit('message', {
        message: data.message,
        to: data.to,
        username: clients[socket.userID].username
      })
    })

    socket.on('list chat', async () => {
      const listChat = await ListChat.findOne({ user: socket.userID })
        .populate({
          path: 'chats',
          match: { isGroup: false },
          populate: [
            {
              path: 'messages',
              options: { sort: { createdAt: -1 } }
            },
            {
              path: 'users',
              select: 'username photo'
            }
          ]
        })

      const chatsOrdends = listChat.chats.sort((a, b) => {
        return new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt)
      })

      socket.emit('list chat', chatsOrdends)
    })

    socket.on('disconnect', async () => {
      delete clients[socket.userID]
      await User.findByIdAndUpdate(socket.userID, { isOnline: false })
      socket.broadcast.emit('users online', clients)
    })
  })
}
