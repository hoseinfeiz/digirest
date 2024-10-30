const createCustomError = require('../../utils/customError')
const validator = require('validator')
const Survey = require('../models/Survey')
const Category = require('../models/Category')
exports.postSurveys = async (req, next) => {
  const { surveyList } = req.body

  let lastID = ''
  try {
    for (let index = 0; index < surveyList.length; index++) {
      const element = surveyList[index]
      const { name, label = null, category } = element
      if (validator.isEmpty(name)) {
        throw createCustomError(
          `فیلد نام معیار ارزیابی ${index + 1} خالی است`,
          400
        )
      }

      if (validator.isEmpty(category)) {
        throw createCustomError(
          `فیلد دسته بندی معیار ارزیابی ${index + 1} خالی است`,
          400
        )
      }

      if (await Survey.findOne({ name, category })) {
        throw createCustomError(`نام معیار ارزیابی ${name} تکراری است`, 400)
      }
    }
    for (let index = 0; index < surveyList.length; index++) {
      const element = surveyList[index]
      const { name, label = null, category } = element
      const surveyID = await Survey.create({
        name,
        label,
        category,
      })
      lastID = surveyID
    }

    return lastID
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getSurveys = async (req, next) => {
  try {
    const { categoryID } = req.body
    const { fields } = req.query
    const fieldSelection = fields ? fields.split(',').join(' ') : ''
    if (validator.isEmpty(categoryID)) {
      throw createCustomError('لطفا آیدی زیردسته را وارد نمائید', 400)
    }
    const cat = await Category.findById(categoryID)
    if (cat.parent === null) {
      throw createCustomError('معیار امتیازدهی برای دسته اصلی وجود ندارد', 404)
    }
    const surveys = await Survey.find(
      { category: categoryID },
      {
        select: fieldSelection,
        populate: { path: 'category', select: 'name parent' },
      }
    )
    return surveys.docs
  } catch (error) {
    console.error(error)
    next(error)
  }
}
