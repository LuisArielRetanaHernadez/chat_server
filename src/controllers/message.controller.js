const Chat = require('../database/models/Chat.model')
const Message = require('../database/models/Menssage.model')
const tryCathc = require('../utils/tryCathc')

exports.saveMessage = async (req, res, next) => {
  const { message } = req.body

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
