const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const Category = new Schema(
  {
    name: { type: String, required: true },
    label: { type: String },
    image: { type: Schema.Types.ObjectId, ref: 'Multimedia', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  }
)
Category.plugin(mongoosePaginate)
module.exports = mongoose.model('Category', Category)
