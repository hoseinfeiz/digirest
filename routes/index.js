const express = require('express')
const router = express.Router()

const LoginController = require('../app/controllers/LoginController')

router.get('/login', LoginController.get)
router.post('/login', LoginController.post)

module.exports = router
