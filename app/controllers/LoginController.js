const User = require("../models/User")
const createCustomError = require('../../utils/customError');

const get = async (req,res , next) => {
//   try {
//     const users = await User.find({phone:'hasan'})
//     console.log(users)
//     if(!users.length){
//         throw createCustomError('No users found', 404);
//     }
//   } catch (error) {
//     next(error)
//   }
res.json({
    message: "im in get"
})
}

const post = (req,res,next) => {
    console.log('req.body',req.body)
    res.json({
        message: "ok"
    })
}

module.exports = {
    get,
    post
}