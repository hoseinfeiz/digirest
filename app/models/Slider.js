const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Slider = new mongoose.Schema(
  {
    name: { type: String, required: true },
    defaultSlider: { type: Boolean, default: false },
    image: [{ type: Schema.Types.ObjectId, ref: 'Multimedia', required: true }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Slider', Slider)
