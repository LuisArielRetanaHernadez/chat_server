const Email = require('email-templates')

const email = new Email({
  message: {
    from: process.env.FROM
  },
  send: true,
  // transport,
  views: {
    options: {
      extension: 'handlebars'
    }
  }
})

export default email
