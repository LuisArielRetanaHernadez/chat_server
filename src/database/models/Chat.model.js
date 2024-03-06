const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messages'
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
