const multer = require('multer')
const path = require('path')
const Multimedia = require('../models/Multimedia')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image')

// Function to save file details in MongoDB
const saveFileToDatabase = async (file) => {
  const filePath = path.join('uploads', file.filename) // Relative path to access the file
  await Multimedia.create({
    name: file.filename,
    dir: filePath,
  })
}

module.exports = {
  upload,
  saveFileToDatabase,
}
