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

  try {
    if (req.body.mainCategory && !req.body.parentCategory) {
      let cats = await Category.paginate(
        { parent: null },
        { page, limit, select: fieldSelection, populate: { path: 'image' } }
      )
      return cats.docs
    } else if (!req.body.mainCategory && req.body.parentCategory) {
      let cats = await Category.paginate(
        { parent: req.body.catID },
        {
          page,
          limit,
          select: fieldSelection,
          populate: [
            { path: 'parent', select: 'name parent' },
            { path: 'image', select: 'name dir' },
          ],
        }
      )
      return cats.docs
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.putCategories = async (req, next) => {
  try {
    const { id } = req.params
    const { name, label, image, parent } = req.body
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد نام دسته خالی است', 400)
    }
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد تصویر دسته خالی است', 400)
    }

    const newCat = await Category.findByIdAndUpdate(
      id,
      { name, label, image, parent },
      { new: true, runValidators: true }
    )
    return newCat
  } catch (error) {
    console.error(error)
    next(error)
  }
}
exports.patchCategories = async (req, next) => {
  try {
    const { id } = req.params
    const { updates } = req.body

    const updatedCat = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
    return updatedCat
  } catch (error) {
    console.error(error)
    next(error)
  }
}
exports.deleteCategories = async (req, next) => {
  try {
    const { id } = req.params
    const deletedCat = await Category.findByIdAndDelete(id)
    if (!deletedCat) {
      throw createCustomError('دسته بندی مورد نظر یافت نشد', 404)
    }
    return deletedCat
  } catch (error) {
    console.error(error)
    next(error)
  }
}
