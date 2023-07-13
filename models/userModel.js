const mongoose = require("mongoose");
// const Blog = require('./blogModel').schema;

//creating schema for user collection in mongoDB database
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        blogs: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Blog",
            },
        ],
    },
    { timestamps: true }
);

//creating blog model or collection 
const userModel = mongoose.model("User", userSchema);

//exporting user model
module.exports = userModel;