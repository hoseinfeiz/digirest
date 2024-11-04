const Banner = require('../models/Banner')
const Category = require('../models/Category')
const Multimedia = require('../models/Multimedia')
const createCustomError = require('../../utils/customError')
const validator = require('validator')

exports.postBanner = async (req, next) => {
  try {
    const { category, active, image } = req.body
    if (validator.isEmpty(category)) {
      throw createCustomError('فیلد دسته خالی است', 400)
    }
    if (validator.isEmpty(image)) {
      throw createCustomError('فیلد تصویر خالی است', 400)
    }
    let cat = await Category.findById(category)
    let bannerImg = await Multimedia.findById(image)
    if (cat == null || cat.parent == null) {
      throw createCustomError('برای این دسته بندی نمی توانید بنر ثبت کنید', 400)
    }
    if (bannerImg == null) {
      throw createCustomError('چنین تصویری وجود ندارد', 400)
    }
    let repeatCheck = await Banner.find({ category, image })

    if (repeatCheck.length !== 0) {
      throw createCustomError('تکراری است', 400)
    }
    const bannerID = await Banner.create({
      category,
      active,
      image,
    })
    return bannerID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getBanner = async (req, next) => {
  try {
    const { fields } = req.query
    const fieldItems = fields ? fields.split(',').join(' ') : ''
    const BannerList = await Banner.find({}, fieldItems)
      .populate([
        {
          path: 'category',
          select: 'name parent',
          populate: { path: 'parent' },
        },
        { path: 'image', select: 'name dir' },
      ])
      .exec()
    return BannerList
  } catch (error) {
    console.error(error)
    next(error)
  }
}
