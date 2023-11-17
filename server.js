const app = require('./app')

const connectDB = require('./src/database/database')

// socket
const { Server } = require('socket.io')
const { createServer } = require('http')
const nameSpace = require('./src/namespaces/nameSpace')

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', nameSpace)
// nameSpace(io)

const startServer = () => {
  httpServer.listen(3000, () => {
    console.log('Server is running on port 3000')
    connectDB()
  })
}

startServer()
