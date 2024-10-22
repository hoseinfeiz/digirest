const mongoose = require('mongoose')
const User = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: String, default: false },
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('User', User)