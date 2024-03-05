const express = require('express')
const { saveMessage, getMenssages } = require('../controllers/message.controller')

const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(auth)

router.post('/save', saveMessage)
router.get('/:id', getMenssages)

module.exports = { routerMessage: router }
