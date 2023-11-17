const app = require('./app')

const connectDB = require('./src/database/database')

// socket
const { Server } = require('socket.io')
const { createServer } = require('http')

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

const nameSpace = (socket) => {
}
io.on('connection', nameSpace)

const startServer = () => {
  httpServer.listen(3000, () => {
    console.log('Server is running on port 3000')
    connectDB()
  })
}

startServer()
