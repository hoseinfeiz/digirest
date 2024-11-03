const createCustomError = require('../../utils/customError')
const validator = require('validator')
const Category = require('../models/Category')
const ProductSpec = require('../models/ProductSpec')
const ProductSpecDetails = require('../models/ProductSpecDetails')
exports.postProductSpecDetails = async (req, next) => {
  try {
    const { name, label = null, specs } = req.body
    if (validator.isEmpty(name)) {
      throw createCustomError('فیلد نام ریزمشخصات خالی است', 400)
    }

    if (!(await ProductSpec.findOne({ _id: specs }))) {
      throw createCustomError(' مشخصات مورد نظر وجود ندارد', 404)
    }

    if (
      await ProductSpecDetails.findOne({
        specs,
        name,
      })
    ) {
      throw createCustomError('ریزمشخصات محصول تکراری است', 400)
    }

    const specDetailId = await ProductSpecDetails.create({
      name,
      label,
      specs,
    })

    return specDetailId
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getProductSpecDetails = async (req, next) => {
  try {
    const { specs } = req.body
    const { fields } = req.query
    const fieldSelection = fields ? fields.split(',').join(' ') : ''
    let spec = await ProductSpec.findById(specs)

    if (!spec) {
      throw createCustomError('چنین مشخصاتی وجود ندارد', 404)
    } else {
      const list = await ProductSpecDetails.find(
        { specs },
        fieldSelection
      ).populate({ path: 'specs', populate: { path: 'category' } })

      return list
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
