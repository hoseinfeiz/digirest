const createCustomError = require('../../utils/customError')
const Multimedia = require('../models/Multimedia')

exports.multimedia = async (filename, filepath) => {
  try {
    const image_id = await Multimedia.create({
      name: filename,
      dir: filepath,
    })
    return image_id
  } catch (error) {
    throw createCustomError(
      'در ذخیره سازی تصویر در دیتابیس خطا رخ داده است',
      500
    )
  }
}
