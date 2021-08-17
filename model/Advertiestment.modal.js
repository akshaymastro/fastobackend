const mongoose = require('mongoose')

const Advertiesment = new mongoose.Schema({
  file_details: {
    type: String
  },
  file_link: {
    type: String
  }
})

const AdvertiesmentSchema = mongoose.model('AdvertiesmentSchema', Advertiesment)

module.exports = Advertiesment
