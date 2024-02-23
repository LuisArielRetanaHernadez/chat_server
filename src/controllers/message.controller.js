const Chat = require('../database/models/Chat.model')
const Menssage = require('../database/models/Menssage.model')

exports.saveMessage = async (req, res, next) => {
  const { message } = req.body

  const newMessage = Menssage.create({
    content: message,
    authID: req.user.id,
    createDate: new Date()
  })
  /*
    comprobare si existe un chat individual entre los usuarios
    por lo cual el campo users debe tener 2 usuarios y los id de los
    usuarios del chat
  */
  const chat = await Chat.findOne({ users: [req.user.id, req.body.id], isGroup: true })

  if (!chat) {
    const newChat = Chat.create({
      name: 'not name',
      users: [req.user.id, req.body.id],
      isGroup: true,
      messagesIds: [newMessage]
    })
    return res.status(200).json({
      message: 'chat created',
      data: newChat,
      status: 'succes'
    })
  }

  await chat.updateOne({ $set: { messagesIds: message } })

  chat.messages.push(newMessage)
  await chat.save()

  return res.status(200).json({
    message: 'chat created',
    data: chat,
    status: 'succes'
  })
}
