const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: false
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  Contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
})

const User = mongoose.model('Users', userSchema)

module.exports = User
