const createCustomError = require('../../utils/customError')
const Brand = require('../models/Brand')
const validator = require('validator')
exports.postBrands = async (req, next) => {
  const { name, label = null, image, category } = req.body

  try {
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد نام برند خالی است', 400)
    }
    if (validator.isEmpty(image)) {
      throw createCustomError('فیلد تصویر برند خالی است', 400)
    }
    if (category.length === 0) {
      throw createCustomError('فیلد دسته بندی برند خالی است', 400)
    }

    if (await Brand.findOne({ name: name })) {
      throw createCustomError('نام برند تکراری است', 400)
    }

    const brandID = await Brand.create({
      name,
      label,
      category,
      image,
    })
    return brandID
  } catch (error) {
    console.error(error)
    next(error)
  }
}
