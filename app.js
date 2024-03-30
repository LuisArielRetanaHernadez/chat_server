const express = require('express')

// routers
const { routerUser } = require('./src/routers/user.router')
const { routerMessage } = require('./src/routers/message.router')
const { routerContact } = require('./src/routers/contacts.routers')
// middlewares
const globalError = require('./src/middlewares/errors.middleware')

// cors
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/v1/users', routerUser)
app.use('/api/v1/messages', routerMessage)
app.use('/api/v1/contacts', routerContact)
app.use(globalError)

module.exports = app
