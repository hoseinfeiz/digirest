const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const Product = new Schema(
  {
    fname: { type: String, required: true },
    ename: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    images: [
      { type: Schema.Types.ObjectId, ref: 'Multimedia', required: true },
    ],
    attributes: [
      { type: Schema.Types.ObjectId, ref: 'ProductAttribute', required: true },
    ],
    details: [
      { type: Schema.Types.ObjectId, ref: 'ProductDetail', required: true },
    ],
    description: { type: String, required: true },
    original: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
Product.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', Product)
