const nodemialer = require('nodemailer')

let transport = null

if (process.env.NODE_ENV !== 'development') {
  transport = nodemialer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ecd077e1a353cc',
      pass: 'c7e902597a90be'
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  transport = nodemialer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  })
}

module.exports = transport
