const express = require('express')
const { createSignCloudinary } = require('../controllers/cloudinary.controller')

const router = express.Router()

router.post('/sign', createSignCloudinary)

module.exports = { routerCloudinary: router }
