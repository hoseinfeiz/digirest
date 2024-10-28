const createCustomError = require('../../utils/customError')
const Category = require('../models/Category')
const validator = require('validator')

exports.postCategories = async (req, next) => {
  try {
    if (validator.isEmpty(req.body.name)) {
      throw createCustomError('فیلد نام دسته خالی است', 400)
    }
    if (validator.isEmpty(req.body.image)) {
      throw createCustomError('فیلد تصویر دسته خالی است', 400)
    }
    if (await Category.findOne({ name: req.body.name })) {
      throw createCustomError('نام دسته بندی تکراری است', 400)
    }

    const catID = Category.create({
      name: req.body.name,
      label: req.body.label,
      image: req.body.image,
      parent: req.body.parent,
    })
    return catID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getCategories = async (req, next) => {
  const page = req.body.page || 1
  const limit = req.body.limit || 10
  const { fields } = req.query
  const fieldSelection = fields ? fields.split(',').join(' ') : ''
  console.log('fieldSelection: ', fieldSelection)
  try {
    if (req.body.mainCategory && !req.body.parentCategory) {
      let cats = await Category.paginate(
        { parent: null },
        { page, limit, select: fieldSelection, populate: { path: 'image' } }
      )
      return cats.docs
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
