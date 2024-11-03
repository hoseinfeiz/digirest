const { postSeller, getSeller } = require('../services/SellerService')

exports.post = async (req, res, next) => {
  const sellerID = await postSeller(req, next)
  if (sellerID) {
    res.status(200).json({
      message: 'فروشنده بدرستی ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const sellerList = await getSeller(req, next)
  if (sellerList) {
    res.status(200).json(sellerList)
  }
}
