const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Banner = Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: Schema.Types.ObjectId, ref: 'Multimedia', required: true },
  active: { type: Boolean, default: false },
})

module.exports = mongoose.model('Banner', Banner)
