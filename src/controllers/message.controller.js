const Chat = require('../database/models/Chat.model')
const ListChat = require('../database/models/ListChat')
const Message = require('../database/models/Menssage.model')
const tryCathc = require('../utils/tryCathc')

exports.saveMessage = async (req, res, next) => {
  const { message } = req.body

  const listChat = await ListChat.findOne({ user: req.userCurrent.id })

  console.log('controlador saveMessage ', listChat)

  const newMessage = await Message.create({
    content: message,
    author: req.userCurrent.id,
    createDate: new Date()
  })

  const chat = await Chat.findOne({
    users: {
      $all: [req.userCurrent.id, req.body.id]
    }
  })

  if (!chat) {
    await Chat.create({
      name: 'not name',
      users: [req.userCurrent.id, req.body.id],
      messages: [newMessage]
    })
    return res.status(204).json({
      message: 'send message',
      status: 'succes'
    })
  }

  await chat.updateOne({ $set: { messagesIds: message } })

  chat.messages.push(newMessage)
  await chat.save()

  if (listChat === null) {
    await ListChat.create({
      _id: req.userCurrent.id,
      user: req.userCurrent.id,
      chats: [chat]
    })

    return res.status(204).json({
      message: 'send message',
      status: 'succes'
    })
  }

  if (!listChat.chats.includes(chat._id)) {
    listChat.chats.push(chat)
    await listChat.save()
  }

  return res.status(204).json({
    message: 'send message',
    status: 'succes'
  })
}

exports.getMenssages = tryCathc(async (req, res, next) => {
  const { id } = req.params

  const chat = await Chat.findOne({
    users: {
      $all: [req.userCurrent.id, id]
    }
  })
    .populate({
      path: 'messages',
      model: 'Messages',
      select: ['content', 'author'],
      populate: {
        path: 'author',
        model: 'Users',
        select: ['Username', 'username']
      }
    })
  if (!chat) {
    return res.status(404).json({
      message: 'chat not found',
      status: 'warning'
    })
  }

  return res.status(200).json({
    message: 'get messages',
    data: {
      messages: chat.messages
    },
    status: 'succes'
  })
})
