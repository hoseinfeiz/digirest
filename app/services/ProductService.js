const Product = require('../models/Product')
const ProductDetail = require('../models/ProductDetail')
const ProductAttribute = require('../models/ProductAttribute')
const createCustomError = require('../../utils/customError')
const validator = require('validator')

exports.postProduct = async (req, next) => {
  try {
    const { category, active, image } = req.body
    if (validator.isEmpty(category)) {
      throw createCustomError('فیلد دسته خالی است', 400)
    }
    if (validator.isEmpty(image)) {
      throw createCustomError('فیلد تصویر خالی است', 400)
    }
    let cat = await Category.findById(category)
    let ProductImg = await Multimedia.findById(image)
    if (cat == null || cat.parent == null) {
      throw createCustomError('برای این دسته بندی نمی توانید بنر ثبت کنید', 400)
    }
    if (ProductImg == null) {
      throw createCustomError('چنین تصویری وجود ندارد', 400)
    }
    let repeatCheck = await Product.find({ category, image })

    if (repeatCheck.length !== 0) {
      throw createCustomError('تکراری است', 400)
    }
    const ProductID = await Product.create({
      category,
      active,
      image,
    })
    return ProductID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getProduct = async (req, next) => {
  try {
    const { fields } = req.query
    const fieldItems = fields ? fields.split(',').join(' ') : ''
    const ProductList = await Product.find({}, fieldItems)
      .populate([
        {
          path: 'category',
          select: 'name parent',
          populate: { path: 'parent' },
        },
        { path: 'image', select: 'name dir' },
      ])
      .exec()
    return ProductList
  } catch (error) {
    console.error(error)
    next(error)
  }
}
