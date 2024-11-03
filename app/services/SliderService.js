const Slider = require('../models/Slider')
const createCustomError = require('../../utils/customError')
const validator = require('validator')

exports.postSlider = async (req, next) => {
  try {
    const { name, defaultSlider, image = [] } = req.body
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد نام اسلایدر خالی است', 400)
    }
    if (image.length === 0) {
      throw createCustomError('عکسی وارد نشده است', 400)
    }
    if (await Slider.findOne({ name })) {
      throw createCustomError('اسلایدر با این نام وجود دارد', 400)
    }
    if (defaultSlider) {
      if (await Slider.findOne({ defaultSlider: true })) {
        throw createCustomError(' اسلایدرپیش فرض در حال حاضر وجود دارد', 400)
      } else {
        const sliderID = await Slider.create({
          name,
          image,
          defaultSlider,
        })
        return sliderID
      }
    } else {
      const sliderID = await Slider.create({
        name,
        image,
        defaultSlider,
      })
      return sliderID
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getSlider = async (req, next) => {
  try {
    const { fields } = req.query
    const fieldItems = fields ? fields.split(',').join(' ') : ''
    const SliderList = await Slider.find({}, fieldItems)
      .populate('image', 'name dir')
      .exec()
    return SliderList
  } catch (error) {
    console.error(error)
    next(error)
  }
}
