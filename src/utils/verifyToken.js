const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken = (token) => {
  const isTokenValid = jwt.verify(token, process.env.JW_SECRET)

  if (!isTokenValid) {
    throw new Error('Invalid token')
  }

  return isTokenValid
}

module.exports = verifyToken
