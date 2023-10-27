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

io.on('connection', (socket) => {
  console.log('user connect ', socket.id)
})

const startServer = () => {
  httpServer.listen(3000, () => {
    console.log('Server is running on port 3000')
    connectDB()
  })
}

startServer()

module.exports = io
