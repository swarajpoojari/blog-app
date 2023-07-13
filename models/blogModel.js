const mongoose = require('mongoose');
// const User = require('./userModel').schema;

//creating schema for blog collection in mongoDB database
const blogSchema = new mongoose.Schema({
    titile: {
        type: String,
        require: [true, 'title is required']
    },
    description: {
        type: String,
        require: [true, 'description is required']
    },
    image: {
        type: String,
        require: [true, 'image is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'user ID is required']
    }
}, { timestamps: true })

//creating blog model or collection 
const blogModel = mongoose.model('Blog', blogSchema);

//exporting blog model
module.exports = blogModel;