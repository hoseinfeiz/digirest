const mongoose = require('mongoose')
const Warranty = new mongoose.Schema(
  {
    name: { type: String, required: true },
    label: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Warranty', Warranty)
