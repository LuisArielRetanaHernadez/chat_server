const { addContact, getContacts, getContact } = require("../controllers/user.controller")
const { auth } = require("../middlewares/auth.middleware")
const { existContact } = require("../middlewares/existContact.middleware")

const express = require('express')

const router = express.Router()

// contacts
router.get('/', auth, existContact(false), getContacts)
router.put('/addContact/:id', auth, existContact(false), addContact)
router.get('/contacts/:id', auth, getContact)

module.exports = { routerContact: router }
