const mongoose = require('mongoose');
const dotenv = require('dotenv');

const MONGO_URI = process.env.DB_STRING;


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });