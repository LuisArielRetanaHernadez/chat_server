const jwt = require('jsonwebtoken')
const AppError = require('../AppError')

require('dotenv').config()

const verifyToken = (token) => {
  const isTokenValid = jwt.verify(token, process.env.JW_SECRET, (error, decoded) => {
    if (error) {
      throw new AppError('Invalid token', 401)
    }
    return decoded
  })

  return isTokenValid
}

module.exports = verifyToken
