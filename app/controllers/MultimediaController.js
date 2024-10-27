const createCustomError = require('../../utils/customError')
const { dir } = require('../../helper/saveImage')
const multimedia = require('../services/MultimediaService')
exports.post = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createCustomError('فایل آپلود نشد', 400)
    }

    const filepath = req.file.path
    const filename = req.file.filename
    console.log('dirrr', dir)
    const image_id = await multimedia(filename, dir)
    res.status(200).json({
      status: 200,
      message: 'تصویر بدرستی ذخیره شد',
    })
  } catch (error) {
    console.error(error)
    throw createCustomError('خطا در ذخیره سازی تصویر رخ داد', 400)
  }
}
