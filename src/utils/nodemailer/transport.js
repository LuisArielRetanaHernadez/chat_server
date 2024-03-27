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
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: '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'
    }
  })
}

exports.transport = transport
