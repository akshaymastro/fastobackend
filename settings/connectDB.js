const mongoose = require('mongoose')
const { DB_USERNAME, DB_PASS, DB_NAME, DB_URL } = process.env

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  } catch (error) {
    return error
  }
}

module.exports = connectDB
