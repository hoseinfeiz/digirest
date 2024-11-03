const createCustomError = require('../../utils/customError')
const validator = require('validator')
const Category = require('../models/Category')
const Seller = require('../models/Seller')
exports.postSeller = async (req, next) => {
  try {
    const { name, label = null, category } = req.body
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد نام فروشنده خالی است', 400)
    }
    if (validator.isEmpty(category)) {
      throw createCustomError('فیلد نام فروشنده خالی است', 400)
    }
    let cat = await Category.findById(category).populate('parent').exec()
    if (!cat) {
      throw createCustomError(
        'چنین دسته بندی وجود ندارد که بتوان فروشنده برای آن ثبت کرد',
        400
      )
    }
    if (cat.parent !== null) {
      throw createCustomError(
        'فروشنده را فقط برای دسته اصلی می توان ثبت کرد و برای زیردسته نمی توان',
        400
      )
    }

    if (
      await Seller.findOne({
        category,
        name,
      })
    ) {
      throw createCustomError(' فروشنده تکراری است', 400)
    }

    const sellerID = await Seller.create({
      name,
      label,
      category,
    })
    return sellerID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getSeller = async (req, next) => {
  try {
    const { category } = req.body
    const { fields } = req.query
    const fieldItems = fields ? fields.split(',').join(' ') : ''

    const cat = await Category.findById(category)
    console.log(cat)
    if (validator.isEmpty(category)) {
      throw createCustomError('نام دسته خالی است', 400)
    }
    if (cat !== null) {
      sellerList = await Seller.find({ category }, fieldItems)
        .populate('category', 'name parent')
        .exec()
      return sellerList
    } else {
      throw createCustomError('چنین دسته بندی وجود ندارد', 400)
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
