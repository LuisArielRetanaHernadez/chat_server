const mongoose = require('mongoose')

const menssageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  IDUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  seendIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  IDChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  createDate: {
    type: Date,
    required: true
  }
})

const Menssage = mongoose.model('Menssages', menssageSchema)

module.exports = Menssage
