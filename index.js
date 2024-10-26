const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const morgan = require('morgan')
const DBConnect = require('./configs.js/dbConnect')
require('dotenv').config()

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/', router)

app.use((req, res) => {
  res.status(404).send('Page not found')
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    statusCode: statusCode,
  })
})
DBConnect()

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`)
})
