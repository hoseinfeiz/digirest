const User = require('../app/models/User')
const createCustomError = require('../utils/customError')

exports.check = async (req, res, next) => {
  try {
    if (req.headers.token) {
      const verif = await User.checkToken(req, next)
      req.phone = verif.phone
      next()
    } else {
      throw createCustomError('توکن خالی است', 401)
    }
  } catch (error) {
    next(error)
  }
}

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ phone: req.phone })
    if (user.level) {
      req.admin = true
    } else {
      req.admin = false
    }
    next()
  } catch (error) {
    next(error)
  }
}
