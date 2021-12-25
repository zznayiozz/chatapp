const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', UserSchema)