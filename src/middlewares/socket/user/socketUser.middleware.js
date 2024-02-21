exports.userMiddleware = {
  'send message': async (socket, data, next) => {
    console.log('send message')
    next()
  }
}
