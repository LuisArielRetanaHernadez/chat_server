const mongoose = require('mongoose')

require('dotenv').config()

const connectDB = async () => {
  console.log('Connecting to MongoDB... ', process.env.MONGO_URL)
  const connect = await mongoose.connect(process.env.MONGO_URL)
  console.log(`MongoDB Connected: ${connect}`)
  return connect
}

module.exports = connectDB
