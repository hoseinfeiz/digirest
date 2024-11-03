const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Seller = new mongoose.Schema(
  {
    name: { type: String, required: true },
    label: { type: String },
    category: { type: Schema.Types.ObjectID, required: true, ref: 'Category' },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Seller', Seller)
