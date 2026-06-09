const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  specs: {
    bedrooms: Number,
    bathrooms: Number,
    sizeSqft: Number,
    amenities: [String],
  },
  media: {
    imageUrl: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', propertySchema);
