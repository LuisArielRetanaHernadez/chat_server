const mongoose = require('mongoose')

const chatMessageSchema = new mongoose.Schema({
  IDMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  IDChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }
})

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)

module.exports = ChatMessage
