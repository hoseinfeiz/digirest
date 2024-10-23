const express = require('express')
const router = express.Router()
const LoginController = require('../app/controllers/LoginController')
const RegisterController = require('../app/controllers/RegisterController')
const homeController = require('../app/controllers/homeController')

router.get('/', homeController)
router.get('/login', LoginController.get)
router.post('/login', LoginController.post)
router.post('/register', RegisterController.post)

module.exports = router
