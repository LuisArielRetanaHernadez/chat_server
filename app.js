const express = require('express')

// routers
const { routerUser } = require('./src/routers/user.router')

// middlewares
const globalError = require('./src/middlewares/errors.middleware')

const app = express()

app.use(express.json())

app.use('/api/v1/users', routerUser)
app.use(globalError)

module.exports = app
