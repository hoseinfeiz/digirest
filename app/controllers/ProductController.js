const {
  postProduct,
  getProduct,
  updateProduct,
} = require('../services/ProductService')

exports.post = async (req, res, next) => {
  const ProductID = await postProduct(req, next)
  if (ProductID) {
    res.status(200).json({
      message: 'محصول بدرستی ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const ProductList = await getProduct(req, next)
  if (ProductList) {
    res.status(200).json(ProductList)
  }
}

exports.patch = async (req, res, next) => {
  const idsArr = await updateProduct(req, next)
  if (idsArr.length > 0) {
    res.status(200).json({
      message: 'محصول بدرستی بروزرسانی شد',
    })
  }
}
