exports.arrayDeBytesgenerateCode = (type = 'alfanumerico', numbers = 4) => {
  const caracters = {
    alfanumerico: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    numerico: '0123456789',
    alfabetico: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  }

  let code = ''

  const arrayDeBytes = new Uint8Array(numbers)

  window.crypto.getRandomValues(arrayDeBytes)

  for (let i = 0; i < numbers; i++) {
    code += caracters[type][arrayDeBytes[i] % caracters[type].length]
  }

  return code
}
