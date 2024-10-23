const LoginService = require('../services/LoginService')
const get = async (req, res, next) => {
  res.json({
    message: 'im in get',
  })
}

const post = async (req, res, next) => {
  let token = await LoginService.createToken(req, next)

  if (token) {
    res.json({
      token,
      message: 'لاگین بدرستی انجام شد',
    })
  }
}

module.exports = {
  get,
  post,
}
