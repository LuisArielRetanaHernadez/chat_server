const crypto = require('crypto')

exports.arrayDeBytesgenerateCode = (type = 'alfanumerico', numbers = 4) => {
  const caracters = {
    alfanumerico: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    numerico: '0123456789',
    alfabetico: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  }

  let code = ''

  // creacion de codigo aleatorio con las condiciones dadas com el 'type' y el 'numbers'
  for (let i = 0; i < numbers; i++) {
    code += caracters[type][crypto.randomInt(0, caracters[type].length)]
  }

  return code
}
