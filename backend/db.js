const mongoose = require('mongoose');

async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017');
        console.log('Connected to MongoDB successfully...');
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
    }
}

module.exports = connectToMongo;