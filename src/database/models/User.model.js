const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  photo: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('Users', userSchema)

module.exports = User
