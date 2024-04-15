const nodemialer = require('nodemailer')

let transport = null

if (process.env.NODE_ENV !== 'development') {
  transport = nodemialer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  transport = nodemialer.createTransport({
    host: process.env.SENDGRID_HOST,
    port: process.env.SENDGRID_PORT,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS
    }
  })
}

module.exports = transport
