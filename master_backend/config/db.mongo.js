// config/db.mongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const isMongoConfigured = () => {
  return (
    typeof process.env.MONGODB_URI === 'string' &&
    process.env.MONGODB_URI.trim() !== '' &&
    !process.env.MONGODB_URI.includes('<')
  );
};

const connectDB = async () => {
  if (!isMongoConfigured()) {
    console.warn('Warning: MONGODB_URI is not configured. Starting without DB.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Success: MongoDB Atlas Connected Successfully');
  } catch (error) {
    console.error('Error: MongoDB Connection Error:', error.message);
  }
};

const ensureDatabase = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      success: false,
      error: 'Database is not configured or unavailable. Add a valid MONGODB_URI.',
    });
    return false;
  }
  return true;
};

module.exports = { connectDB, ensureDatabase, isMongoConfigured };