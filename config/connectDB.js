const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

//creating connectin to the mongoDB database with MONGO_URI 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Mongodb Database".bgMagenta.white)
    } catch (err) {
        console.log(`MONGO Connect Error ${err}`.bgRed.white)
    }
}

module.exports = connectDB;