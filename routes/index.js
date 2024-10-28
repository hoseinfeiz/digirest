const express = require('express')

const { upload } = require('../helper/saveImage')
const router = express.Router()
const LoginController = require('../app/controllers/LoginController')
const RegisterController = require('../app/controllers/RegisterController')
const homeController = require('../app/controllers/homeController')
const MultimediaController = require('../app/controllers/MultimediaController')
const CategoryController = require('../app/controllers/CategoryController')
const { check, isAdmin } = require('../helper/auth')

router.get('/', homeController)
router.get('/login', LoginController.get)
router.post('/login', LoginController.post)
router.post('/register', RegisterController.post)
router.post('/category', check, isAdmin, CategoryController.post)
router.get('/category', check, isAdmin, CategoryController.get)
router.post(
  '/multimedia',
  check,
  isAdmin,
  upload.single('image'),
  MultimediaController.post
)
router.get('/multimedia', check, isAdmin, MultimediaController.get)

module.exports = router
