const AppError = require('../AppError')
const email = require('../email/email')

const fs = require('fs')
const path = require('path')

const sendEmail = async (to, from, subject, content, templateName) => {
  const dirCurrent = __dirname

  // obtener verificar si el template existe y luego obtener el template
  const templatePath = path.join(dirCurrent, templateName)

  fs.readdir(dirCurrent, (err, files) => {
    if (err) throw new AppError(err, 404)
    const foldersName = files.filter(file => fs.lstatSync(path.join(dirCurrent, file)).isDirectory())
    console.log(foldersName)
    if (!foldersName.includes(templateName)) {
      throw new AppError('template not found', 404)
    }
  })

  try {
    await email.send({
      template: templatePath,
      message: {
        to,
        from,
        subject,
        content
      },
      locals: {
        ...content
      }
    })
  } catch (error) {
    throw new AppError(error, 500)
  }
}

module.exports = sendEmail
