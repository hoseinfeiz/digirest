const RegisterService = require('../services/RegisterService')

const post = async (req, res, next) => {
  let userId = await RegisterService.register(req, next)

  if (userId) {
    res.json({
      message: 'ثبت نام بدرستی انجام شد',
    })
  }
}

module.exports = {
  post,
}
