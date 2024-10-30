const { postBrands, getBrands } = require('../services/BrandService')

exports.post = async (req, res, next) => {
  const brandID = await postBrands(req, next)
  if (brandID) {
    res.status(200).send({ message: 'برند با موفقیت ایجاد گردید' })
  }
}

exports.get = async (req, res, next) => {
  const brands = await getBrands(req, next)
  if (brands) {
    res.status(200).json(brands)
  }
}
