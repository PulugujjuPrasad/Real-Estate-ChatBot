const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting: Prevent API abuse (100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// 2. Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 3. Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// 4. Routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);
app.use('/api/properties', (req, res) => res.send('Properties endpoint coming soon...'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
