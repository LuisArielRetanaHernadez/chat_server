const app = require('./app')

const startServer = () => {
  app.listen(() => {
    console.log('Server is running on port 3000')
  })
}

startServer()
