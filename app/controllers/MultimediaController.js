const { upload, saveFileToDatabase } = require('../services/MultimediaService')

exports.post = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(err)
    }

    if (!req.file) {
      return res.status(400).json({ message: 'فایلی برای آپلود وجود ندارد' })
    }

    try {
      await saveFileToDatabase(req.file)
      res.status(200).json({
        message: 'تصویر بدرستی ذخیره شد',
      })
    } catch (error) {
      next(error) // Pass any database errors to error-handling middleware
    }
  })
}
