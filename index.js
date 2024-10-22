const express = require('express')
const app = express()
const router = require('./routes')
const morgan = require('morgan')
const DBConnect = require('./configs.js/dbConnect')

app.use(express.json());
app.use(morgan('dev'))
app.use('/' , router)

app.use((req, res) => {
    res.status(404).send('Page not found')
  })

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    statusCode: statusCode
  });
  })

DBConnect()

app.listen(3000 , ()=>{
    console.log('server is running')
})