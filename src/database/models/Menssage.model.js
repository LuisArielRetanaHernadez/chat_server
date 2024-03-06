const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  createDate: {
    type: Date,
    required: true
  }
})

const Message = mongoose.model('Messages', messageSchema)

module.exports = Message
