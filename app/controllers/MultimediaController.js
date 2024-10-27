const createCustomError = require('../../utils/customError')
const { multimediaDB, getMultimedia } = require('../services/MultimediaService')
const path = require('path')
exports.post = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createCustomError('فایل آپلود نشد', 400)
    }
    const filepath = path.relative('public', req.file.path)
    const filename = req.file.filename

    const image_id = await multimediaDB(filename, filepath)
    res.status(200).json({
      status: 200,
      message: 'تصویر بدرستی ذخیره شد',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.get = async (req, res, next) => {
  const allMultimedia = await getMultimedia(req, next)
  res.status(200).json(allMultimedia)
}
