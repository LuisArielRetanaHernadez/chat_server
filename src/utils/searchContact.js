const User = require('../database/models/User.model')

exports.searchUser = async (userCurrent, searchUser) => {
  const usersFind = await User.find({
    $or: [
      { username: searchUser },
      { email: searchUser },
      { name: searchUser },
      { id: searchUser }
    ]
  })

  if (usersFind.length === 0) {
    return {
      message: 'No se encontro ningun usuario con esas concidencias'
    }
  }

  return usersFind
}
