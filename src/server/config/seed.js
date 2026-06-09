const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. Schema Definition
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

const Property = mongoose.model('Property', propertySchema);

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Paths to raw data
    const basicsPath = path.join(__dirname, '../../../Case Study 3 JSON 1 (1).txt');
    const characteristicsPath = path.join(__dirname, '../../../Case Study 3 JSON 2.txt');
    const imagesPath = path.join(__dirname, '../../../Case Study 3 JSON 3.txt');

    // Load data
    const basics = JSON.parse(fs.readFileSync(basicsPath, 'utf8'));
    const characteristics = JSON.parse(fs.readFileSync(characteristicsPath, 'utf8'));
    const images = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));

    console.log('📦 Loading and merging data...');

    const unifiedProperties = basics.map(b => {
      const char = characteristics.find(c => c.id === b.id);
      const img = images.find(i => i.id === b.id);

      if (!char || !img) {
        throw new Error(`Data inconsistency found for ID ${b.id}. Missing characteristic or image.`);
      }

      return {
        propertyId: b.id,
        title: b.title,
        price: b.price,
        location: b.location,
        specs: {
          bedrooms: char.bedrooms,
          bathrooms: char.bathrooms,
          sizeSqft: char.size_sqft,
          amenities: char.amenities,
        },
        media: {
          imageUrl: img.image_url,
        },
      };
    });

    // Clean existing data to prevent duplicates during seeding
    await Property.deleteMany({});

    // Bulk insert
    await Property.insertMany(unifiedProperties);
    console.log(`🚀 Successfully seeded ${unifiedProperties.length} properties into MongoDB!`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
