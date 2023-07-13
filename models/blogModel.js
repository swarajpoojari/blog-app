const mongoose = require('mongoose');
// const User = require('./userModel').schema;

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

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;