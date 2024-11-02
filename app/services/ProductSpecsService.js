const createCustomError = require('../../utils/customError')
const validator = require('validator')
const Category = require('../models/Category')
const ProductSpec = require('../models/ProductSpec')
exports.postProductSpecs = async (req, next) => {
  const { specs, label = null, category } = req.body
  try {
    if (validator.isEmpty(specs)) {
      throw createCustomError(`فیلد نام مشخصات  خالی است`, 400)
    }

    if (!(await Category.findById(category))) {
      throw createCustomError(`فیلد دسته بندی مشخصات  خالی است`, 400)
    }

    if (
      await ProductSpec.findOne({
        category,
        specs,
      })
    ) {
      throw createCustomError(' دسته بندی مشخصات  تکراری است', 400)
    }

    const productSpecsID = await ProductSpec.create({
      specs,
      label,
      category,
    })
    return productSpecsID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getProductSpecs = async (req, next) => {
  try {
    const { categoryID } = req.body
    const { fields } = req.query
    const fieldSelection = fields ? fields.split(',').join(' ') : ''
    let cats = await Category.findById(categoryID).populate('parent').exec()
    if (!cats) {
      throw createCustomError('چنین دسته بندی وجود ندارد', 404)
    }
    if (cats.parent === null) {
      throw createCustomError(
        'این دسته اصلی است و برای آن مشخصات محصول وجود ندارد',
        404
      )
    } else if (cats.parent.parent == null) {
      const list = await ProductSpec.find(
        { category: categoryID },
        fieldSelection
      )
        .populate('category', 'name parent')
        .exec()
      if (list.length == 0) {
        throw createCustomError(
          'برای این دسته بندی مشخصات محصول ثبت نشده است',
          400
        )
      }
      return list
    } else {
      const list = await ProductSpec.find(
        { category: cats.parent },
        fieldSelection
      )
        .populate('category', 'name parent')
        .exec()
      if (list.length == 0) {
        throw createCustomError(
          'برای این دسته بندی مشخصات محصول ثبت نشده است',
          400
        )
      }
      return list
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
