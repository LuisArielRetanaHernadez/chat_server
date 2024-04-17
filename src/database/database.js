const mongoose = require('mongoose')

require('dotenv').config()

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URL)
  console.log(`MongoDB Connected: ${connect}`)
  return connect
}

module.exports = connectDB
