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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    sparse: true,
    expires: 3600
  },
  status: {
    type: String,
    default: 'pending'
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 3600
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
