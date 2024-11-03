const { postWarranty, getWarranty } = require('../services/WarrantyService')

exports.post = async (req, res, next) => {
  const warrantyID = await postWarranty(req, next)
  if (warrantyID) {
    res.status(200).json({
      message: 'گارانتی بدرستی ذخیره شد',
    })
  }
}

exports.get = async (req, res, next) => {
  const warrantyList = await getWarranty(req, next)
  if (warrantyList) {
    res.status(200).json(warrantyList)
  }
}
