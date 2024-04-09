import * as jwt from 'jsonwebtoken'

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JW_SECRET, { expiresIn: '1h' })
}

module.exports = signToken
