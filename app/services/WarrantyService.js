const Warranty = require('../models/Warranty')
const createCustomError = require('../../utils/customError')
const validator = require('validator')

exports.postWarranty = async (req, next) => {
  try {
    const { name, label = null } = req.body
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد نام گارانتی خالی است', 400)
    }

    if (await Warranty.findOne({ name })) {
      throw createCustomError(' گارانتی تکراری است', 400)
    }

    const WarrantyID = await Warranty.create({
      name,
      label,
    })
    return WarrantyID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getWarranty = async (req, next) => {
  try {
    const { fields } = req.query
    const fieldItems = fields ? fields.split(',').join(' ') : ''
    const WarrantyList = await Warranty.find({}, fieldItems)
    return WarrantyList
  } catch (error) {
    console.error(error)
    next(error)
  }
}
