const express = require('express')

const { upload } = require('../helper/saveImage')
const router = express.Router()
const LoginController = require('../app/controllers/LoginController')
const RegisterController = require('../app/controllers/RegisterController')
const homeController = require('../app/controllers/homeController')
const MultimediaController = require('../app/controllers/MultimediaController')
const { check, isAdmin } = require('../helper/auth')

router.get('/', homeController)
router.get('/login', LoginController.get)
router.post('/login', LoginController.post)
router.post('/register', RegisterController.post)
router.post(
  '/multimedia',
  check,
  isAdmin,
  upload.single('image'),
  MultimediaController.post
)

module.exports = router
