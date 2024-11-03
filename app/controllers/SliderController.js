const { postSlider, getSlider } = require('../services/SliderService')

exports.post = async (req, res, next) => {
  const SliderID = await postSlider(req, next)
  if (SliderID) {
    res.status(200).json({
      message: 'اسلایدر بدرستی ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const SliderList = await getSlider(req, next)
  if (SliderList) {
    res.status(200).json(SliderList)
  }
}
