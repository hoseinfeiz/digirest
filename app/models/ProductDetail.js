const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductDetail = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, default: null },
    detail: {
      type: Schema.Types.ObjectId,
      ref: 'ProductSpecDetails',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('ProductDetail', ProductDetail)
