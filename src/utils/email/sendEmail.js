const AppError = require('../AppError')
const email = require('../email/email')

const fs = require('fs')
const path = require('path')

const sendEmail = async (to, from, subject, content, templateName) => {
  const dirCurrent = __dirname
  // const dirTemplate = path.join(dirCurrent, 'templates')

  // fs.readFile(path.join(dirCurrent, 'templates', templateName), 'utf8', (err, html) => {
  //   if (err) throw err
  //   content = html
  // })

  fs.readdir(dirCurrent, (err, files) => {
    if (err) throw new AppError(err, 404)
    const foldersName = files.filter(file => fs.lstatSync(path.join(dirCurrent, file)).isDirectory())
    if (!foldersName.includes(templateName)) {
      throw new AppError('template not found', 404)
    }
  })

  try {
    await email.send({
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
  } catch (error) {
    throw new AppError(error, 500)
  }
}

module.exports = sendEmail
