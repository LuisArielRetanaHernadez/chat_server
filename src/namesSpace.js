const userSpace = require('./space/user.space')

const namesSpace = (io) => {
  userSpace(io)
}

module.exports = namesSpace
