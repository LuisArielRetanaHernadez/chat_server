const mongoose = require('mongoose')

const checkEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const CheckEmail = mongoose.model('CheckEmail', checkEmailSchema)

module.exports = CheckEmail
