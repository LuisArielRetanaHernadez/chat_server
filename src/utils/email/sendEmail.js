import AppError from '../AppError'
import { transport } from '../nodemailer/transport'

const fs = require('fs')
const path = require('path')

const sendEmail = (to, from, subject, content, templateName) => {
  const dirCurrent = __dirname
  // const dirTemplate = path.join(dirCurrent, 'templates')

  // fs.readFile(path.join(dirCurrent, 'templates', templateName), 'utf8', (err, html) => {
  //   if (err) throw err
  //   content = html
  // })

  fs.readdir(dirCurrent, (err, files) => {
    if (err) throw AppError(err, 404)
    const foldersName = files.filter(file => fs.lstatSync(path.join(dirCurrent, file)).isDirectory())
    if (!foldersName.includes(templateName)) {
      throw AppError('template not found', 404)
    }
  })

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
