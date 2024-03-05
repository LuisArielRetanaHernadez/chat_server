const Chat = require('../database/models/Chat.model')
const Menssage = require('../database/models/Menssage.model')
const tryCathc = require('../utils/tryCathc')

exports.saveMessage = async (req, res, next) => {
  const { message, isGroup } = req.body

  const newMessage = Menssage.create({
    content: message,
    authID: req.userCurrent.id,
    createDate: new Date()
  })

  const chat = await Chat.findOne({ users: [req.user.id, req.body.id], isGroup })

  if (!chat) {
    await Chat.create({
      name: 'not name',
      users: [req.user.id, req.body.id],
      isGroup: true,
      messagesIds: [newMessage]
    })
    return res.status(204).json({
      message: 'send message',
      status: 'succes'
    })
  }

  await chat.updateOne({ $set: { messagesIds: message } })

  chat.messages.push(newMessage)
  await chat.save()

  return res.status(204).json({
    message: 'send message',
    status: 'succes'
  })
}

exports.getMenssages = tryCathc(async (req, res, next) => {
  const { id } = req.params
  const chat = await Chat.findOne({ users: [req.userCurrent.id, id], isGroup: false })
    .populate('messagesIds')

  if (!chat) {
    return res.status(404).json({
      message: 'chat not found',
      status: 'warning'
    })
  }

  return res.status(200).json({
    message: 'get messages',
    data: chat,
    status: 'succes'
  })
})
