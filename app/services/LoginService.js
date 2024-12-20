const bcrypt = require('bcrypt')
const User = require('../models/User')
const createCustomError = require('../../utils/customError')
var validator = require('validator')
exports.createToken = async (req, next) => {
  try {
    if (validator.isEmpty(req.body.phone)) {
      throw createCustomError('فیلد موبایل خالی است', 400)
    }
    if (validator.isEmpty(req.body.password)) {
      throw createCustomError('فیلد پسوورد خالی است', 400)
    }
    const user = await User.findOne({ phone: req.body.phone })
    if (user) {
      const check = bcrypt.compareSync(req.body.password, user.password)
      if (check) {
        return await User.createToken(req, '1d')
      } else {
        throw createCustomError('پسوورد اشتباه است', 401)
      }
    } else {
      throw createCustomError('چنین کاربری وجود ندارد', 404)
    }
  } catch (error) {
    next(error)
  }
}
