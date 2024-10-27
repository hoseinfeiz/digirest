const multer = require('multer')
const path = require('path')
const { mkdirp } = require('mkdirp')
let dir = ''
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = new Date()
    dir = `uploads/${date.getFullYear()}/${date.getMonth() + 1}`
    const dir_path = path.join(__dirname, `../public/${dir}`)
    mkdirp.sync(path.join(__dirname, `../public/${dir}`))
    cb(null, dir_path)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

module.exports = { upload }
