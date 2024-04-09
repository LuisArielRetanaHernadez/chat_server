import * as jwt from 'jsonwebtoken'

const signToken = (payload, expiers = '1h') => {
  return jwt.sign(payload, process.env.JW_SECRET, { expiresIn: expiers })
}

module.exports = signToken
