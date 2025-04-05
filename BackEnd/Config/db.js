const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    mongoose.connect(mongoUri);
    console.log("Connected to DB");
}

module.exports = connectDB;