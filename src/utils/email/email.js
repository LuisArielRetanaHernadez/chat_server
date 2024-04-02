const Email = require('email-templates')

const transport = require('../nodemailer/transport')

const email = new Email({
  message: {
    from: 'regalomessi10@gmail.com'
  },
  send: true,
  transport,
  views: {
    options: {
      extension: 'handlebars'
    }
  }
})

module.exports = email
