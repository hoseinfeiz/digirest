const {
  postProductSpecDetails,
} = require('../services/ProductSpecDetailsService')
exports.post = async (req, res, next) => {
  const productSpecDetailsID = await postProductSpecDetails(req, next)
  if (productSpecDetailsID) {
    res.status(200).json({
      message: 'ریزمشخصات محصول با موفقیت ذخیره شد',
    })
  }
}
