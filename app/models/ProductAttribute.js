const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const ProductAttribute = new Schema(
  {
    color: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    warranty: { type: Schema.Types.ObjectId, ref: 'Warranty', required: true },
  },
  {
    timestamps: true,
  }
)
ProductAttribute.plugin(mongoosePaginate)
module.exports = mongoose.model('ProductAttribute', ProductAttribute)
