const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);
const db = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

module.exports = db;
