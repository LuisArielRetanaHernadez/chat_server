const mongoose = require('mongoose')

const menssageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  authID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  createDate: {
    type: Date,
    required: true
  }
})

const Menssage = mongoose.model('Menssages', menssageSchema)

module.exports = Menssage
