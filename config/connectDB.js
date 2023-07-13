const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

// dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Mongodb Database".bgMagenta.white)
    } catch(err){
        console.log(`MONGO Connect Error ${err}`.bgRed.white)
    }
}

module.exports = connectDB;