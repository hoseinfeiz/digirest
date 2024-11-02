const {
  postProductSpecs,
  getProductSpecs,
} = require('../services/ProductSpecsService')
exports.post = async (req, res, next) => {
  const productSpecsID = await postProductSpecs(req, next)
  if (productSpecsID) {
    res.status(200).json({
      message: 'مشخصات محصول با موفقیت ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const productSpecsList = await getProductSpecs(req, next)
  if (productSpecsList) {
    res.status(200).json(productSpecsList)
  }
}
