const { addContact, getContacts, getContact, isContact } = require('../controllers/contact.controller')
const { auth } = require('../middlewares/auth.middleware')
const { existContact } = require('../middlewares/existContact.middleware')

const express = require('express')

const router = express.Router()

// contacts
router.get('/all/:id', auth, getContacts)
router.get('/is/contact/:id', auth, isContact)
router.put('/add/:id', auth, existContact(false), addContact)
router.get('/contacts/:id', auth, getContact)

module.exports = { routerContact: router }
