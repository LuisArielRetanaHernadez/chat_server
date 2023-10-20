const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true
  },
  IDUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  IDContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  CreatAt: {
    type: Date,
    default: Date.now
  },
  UpdateAt: {
    type: Date,
    default: Date.now
  }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
