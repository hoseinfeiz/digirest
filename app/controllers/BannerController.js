const { postBanner, getBanner } = require('../services/BannerService')

exports.post = async (req, res, next) => {
  const BannerID = await postBanner(req, next)
  if (BannerID) {
    res.status(200).json({
      message: 'بنر بدرستی ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const BannerList = await getBanner(req, next)
  if (BannerList) {
    res.status(200).json(BannerList)
  }
}
