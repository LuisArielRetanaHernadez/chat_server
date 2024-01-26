const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  messagesIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menssage'
  }],
  isGroup: {
    type: Boolean,
    default: false
  },
  administrators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
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
