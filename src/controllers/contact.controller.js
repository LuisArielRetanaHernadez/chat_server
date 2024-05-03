// utils
const AppError = require('../utils/AppError')
const tryCathc = require('../utils/tryCathc')

// models
const User = require('../database/models/User.model')

exports.getContacts = tryCathc(async (req, res, next) => {
  const { id } = req.params

  const contacts = await User.find({ _id: id })
    .select('contacts')
    .populate('contacts')

  if (!contacts && contacts !== null) {
    return next(new AppError('error get contacts', 401))
  }

  if (contacts === null) {
    return res.status(200).json({
      message: 'no found contacts',
      status: 'not found'
    })
  }

  return res.status(200).json({
    message: 'get contacts',
    data: {
      contacts: contacts[0]
    },
    status: 'success'
  })
})

exports.getContact = tryCathc(async (req, res, next) => {
  const { userCurrent } = req
  const { id } = req.params

  const existUser = await User.findOne({ _id: id })

  if (existUser === null) {
    return next(new AppError('user does not exist', 401))
  }

  const contact = await User.findOne({ _id: userCurrent.id, contacts: id })
    .select('contacts')
    .populate('contacts')

  if (contact === null) {
    return res.status(200).json({
      message: 'no found contact',
      status: 'not found'
    })
  }

  if (!contact) {
    return next(new AppError('error get contact', 401))
  }

  return res.status(200).json({
    message: 'get contact',
    data: {
      contact
    },
    status: 'success'
  })
})

exports.isContact = tryCathc(async (req, res, next) => {
  const { userCurrent } = req
  const { id } = req.params

  const contact = await User.findOne({ _id: userCurrent.id, contacts: id })
    .select('contacts')
    .populate('contacts')

  if (contact === null) {
    return next(new AppError('error get contact', 401))
  }

  return res.status(200).json({
    message: 'get contact',
    data: {
      contact
    },
    status: 'success'
  })
})

exports.addContact = tryCathc(async (req, res, next) => {
  const { userCurrent } = req
  const { id } = req.params

  if (userCurrent.id === id) {
    return next(new AppError('error add contact', 401))
  }

  const existUser = await User.findOne({ _id: id })

  if (!existUser) {
    return next(new AppError('user does not exist', 401))
  }

  const addContact = await User.findOne({ _id: userCurrent.id })

  addContact.contacts.push({ _id: id })

  if (!addContact) {
    return next(new AppError('error add contact', 401))
  }

  await addContact.save()

  return res.status(200).json({
    message: 'add contact',
    data: {
      addContact
    },
    status: 'success'
  })
})
