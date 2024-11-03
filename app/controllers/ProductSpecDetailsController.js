const {
  postProductSpecDetails,
  getProductSpecDetails,
} = require('../services/ProductSpecDetailsService')
exports.post = async (req, res, next) => {
  const productSpecDetailsID = await postProductSpecDetails(req, next)
  if (productSpecDetailsID) {
    res.status(200).json({
      message: 'ریزمشخصات محصول با موفقیت ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const list = await getProductSpecDetails(req, next)
  if (list) {
    res.status(200).json(list)
  }
}
