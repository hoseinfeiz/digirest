const { postBrands } = require('../services/BrandService')

exports.post = async (req, res, next) => {
  const brandID = await postBrands(req, next)
  if (brandID) {
    res.status(200).send({ message: 'برند با موفقیت ایجاد گردید' })
  }
}
