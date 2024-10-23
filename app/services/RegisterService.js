const bcrypt = require('bcrypt')
const User = require('../models/User')
const createCustomError = require('../../utils/customError')
var validator = require('validator')
exports.register = async (req, next) => {
  try {
    if (validator.isEmpty(req.body.phone)) {
      throw createCustomError('فیلد موبایل خالی است', 400)
    }
    if (validator.isEmpty(req.body.password)) {
      throw createCustomError('فیلد پسوورد خالی است', 400)
    }
    const check = await User.findOne({ phone: req.body.phone })
    if (check) {
      throw createCustomError('این کاربر قبلا ثبت نام کرده است', 409)
    } else {
      const salt = await bcrypt.genSaltSync(10)
      console.log('salt', salt)
      const hash = bcrypt.hashSync(req.body.password, salt)
      const userId = await User.create({
        phone: req.body.phone,
        password: hash,
      })
      return userId
    }
  } catch (error) {
    // console.log('error here is', error)
    next(error)
  }
}
