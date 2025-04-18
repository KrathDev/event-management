const mongoose = require('mongoose');
module.exports.connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}