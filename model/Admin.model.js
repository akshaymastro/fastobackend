const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  mobile: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'subadmin', 'frenchisee'],
    default: 'admin'
  },
  password: {
    type: String
  }
})

adminSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) next(err)
    this.password = hash
    next()
  })
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
