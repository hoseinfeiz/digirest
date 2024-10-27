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

    for (let index = 0; index < allMedias.length; index++) {
      const element = allMedias[index]
      let img = path.join(__dirname, `../../public/${element.dir}`)
      sizeOf(img, (err, dimensions) => {
        element.dimWidth = dimensions.width
        element.dimHeight = dimensions.height
        element.format = dimensions.type
      })
    }
    return allDocs.docs
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = { multimediaDB, getMultimedia }
