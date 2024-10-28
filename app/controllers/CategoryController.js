const { postCategories, getCategories } = require('../services/CategoryService')
exports.post = async (req, res, next) => {
  const catID = await postCategories(req, next)
  if (catID) {
    res.status(200).json({
      message: 'دسته بندی با موفقیت ایجاد شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const catsArr = await getCategories(req, next)
  if (catsArr) {
    res.status(200).json(catsArr)
  }
}
