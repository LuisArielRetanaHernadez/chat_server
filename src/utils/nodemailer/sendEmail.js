import { transport } from './transport'

const sendEmail = (to, from, subject, content, templateName) => {
  transport.send({
    template: templateName,
    message: {
      to,
      from,
      subject,
      content
    },
    locals: {
      subject,
      content
    }
  })
}

export default sendEmail
