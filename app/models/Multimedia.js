const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Multimedia = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dimWidth: { type: String },
    dimHeight: { type: String },
    format: { type: String },
    dir: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
mongoose.plugin(mongoosePaginate)

module.exports = mongoose.model('Multimedia', Multimedia)
