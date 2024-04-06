const mongoose = require('mongoose')

const listChatSchema = new mongoose.Schema({
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  order: {
    type: String,
    default: 'recent'
  }
})

const ListChat = mongoose.model('ListChat', listChatSchema)

module.exports = ListChat
