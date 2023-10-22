const app = require('./app')

const { createServer } = require('http')

const httpServer = createServer(app)

const startServer = () => {
  httpServer.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}

startServer()
