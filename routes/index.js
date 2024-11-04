const express = require('express')

const { upload } = require('../helper/saveImage')
const router = express.Router()
const LoginController = require('../app/controllers/LoginController')
const RegisterController = require('../app/controllers/RegisterController')
const homeController = require('../app/controllers/homeController')
const MultimediaController = require('../app/controllers/MultimediaController')
const CategoryController = require('../app/controllers/CategoryController')
const BrandController = require('../app/controllers/BrandController')
const SurveyController = require('../app/controllers/SurveyController')
const ProductSpecsController = require('../app/controllers/ProductSpecsController')
const ProductSpecDetailsController = require('../app/controllers/ProductSpecDetailsController')
const SellerController = require('../app/controllers/SellerController')
const WarrantyController = require('../app/controllers/WarrantyController')
const SliderController = require('../app/controllers/SliderController')
const BannerController = require('../app/controllers/BannerController')
const { check, isAdmin } = require('../helper/auth')

router.get('/', homeController)
router.get('/login', LoginController.get)
router.post('/login', LoginController.post)
router.post('/register', RegisterController.post)
router.post('/category', check, isAdmin, CategoryController.post)
router.get('/category', check, isAdmin, CategoryController.get)
router.put('/category/:id', check, isAdmin, CategoryController.put)
router.patch('/category/:id', check, isAdmin, CategoryController.patch)
router.delete('/category/:id', check, isAdmin, CategoryController.delete)
router.post(
  '/multimedia',
  check,
  isAdmin,
  upload.single('image'),
  MultimediaController.post
)
router.get('/multimedia', check, isAdmin, MultimediaController.get)
router.post('/brand', check, isAdmin, BrandController.post)
router.get('/brand', check, isAdmin, BrandController.get)
router.post('/survey', check, isAdmin, SurveyController.post)
router.get('/survey', check, isAdmin, SurveyController.get)
router.post('/productspecs', check, isAdmin, ProductSpecsController.post)
router.get('/productspecs', check, isAdmin, ProductSpecsController.get)
router.post(
  '/productspecdetails',
  check,
  isAdmin,
  ProductSpecDetailsController.post
)
router.get(
  '/productspecdetails',
  check,
  isAdmin,
  ProductSpecDetailsController.get
)
router.post('/seller', check, isAdmin, SellerController.post)
router.get('/seller', check, isAdmin, SellerController.get)
router.post('/warranty', check, isAdmin, WarrantyController.post)
router.get('/warranty', check, isAdmin, WarrantyController.get)
router.post('/slider', check, isAdmin, SliderController.post)
router.get('/slider', check, isAdmin, SliderController.get)
router.post('/banner', check, isAdmin, BannerController.post)
router.get('/banner', check, isAdmin, BannerController.get)

module.exports = router
