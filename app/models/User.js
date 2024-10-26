const mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
const createCustomError = require('../../utils/customError')
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

User.statics.createToken = async (req, exp) => {
  const token = await jwt.sign(
    { phone: req.body.phone },
    process.env.SECRET_KEY,
    {
      expiresIn: exp,
    }
  )
  return token
}

User.statics.checkToken = async (req, next) => {
  if (req.headers.token) {
    try {
      const verify = await jwt.verify(req.headers.token, process.env.SECRET_KEY)
      return verify
    } catch (error) {
      next(error)
    }
  } else {
    return null
  }
}

module.exports = mongoose.model('User', User)
