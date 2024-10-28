const createCustomError = require('../../utils/customError')
const Multimedia = require('../models/Multimedia')
const imageType = require('image-type')
const sizeOf = require('image-size')
const path = require('path')
const multimediaDB = async (filename, filepath) => {
  try {
    const image_id = await Multimedia.create({
      name: filename,
      dir: filepath,
    })
    return image_id
  } catch (error) {
    console.error(error)
    throw createCustomError(
      'در ذخیره سازی تصویر در دیتابیس خطا رخ داده است',
      500
    )
  }
}

const getMultimedia = async (req, next) => {
  try {
    const page = req.body.page || 1
    const limit = req.body.limit || 10
    const allDocs = await Multimedia.paginate({}, { page, limit })
    const allMedias = allDocs.docs

    try {
      await Promise.all(
        allMedias.map((element) => {
          let img = path.join(__dirname, `../../public/${element.dir}`)
          let dimensions = sizeOf(img)
          element.dimWidth = dimensions.width
          element.dimHeight = dimensions.height
          element.format = dimensions.type
        })
      )
    } catch (error) {
      console.error(error)
      throw createCustomError('در گرفتن اندازه تصویر خطایی بوجود آمده است', 500)
    }

    return allMedias
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = { multimediaDB, getMultimedia }
