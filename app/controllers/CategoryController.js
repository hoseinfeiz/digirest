const {
  postCategories,
  getCategories,
  putCategories,
  patchCategories,
  deleteCategories,
} = require('../services/CategoryService')
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

exports.put = async (req, res, next) => {
  const newCat = await putCategories(req, next)
  if (newCat) {
    res
      .status(200)
      .json({ message: 'دسته بندی با موفقیت بروزرسانی شد', data: newCat })
  }
}

exports.patch = async (req, res, next) => {
  const updatedCat = await patchCategories(req, next)
  if (updatedCat) {
    res
      .status(200)
      .json({ message: 'دسته بندی با موفقیت بروزرسانی شد', data: updatedCat })
  }
}

exports.delete = async (req, res, next) => {
  const delCat = await deleteCategories(req, next)
  if (delCat) {
    res.status(200).json(delCat)
  }
}
