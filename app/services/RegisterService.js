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
      const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
      const hash = bcrypt.hashSync(req.body.password, salt)
      const userId = await User.create({
        phone: req.body.phone,
        password: hash,
      })
      return userId
    }
  } catch (error) {
    if (!(error.statusCode === 409 || error.statusCode === 400)) {
      next(createCustomError('خطا در ذخیره دیتا در دیتابیس رخ داده است', 500))
    }
    next(error)
  }
}
