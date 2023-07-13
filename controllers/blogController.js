const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose');

//get all blogs
module.exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No Blogs found',
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All Blogs list',
            blogs,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Error While Getting Blogs',
            err,
        })
    }
}

//create blogs
module.exports.createBlogsController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status.send({
                success: false,
                message: 'Please Provide All Fields',
            })
        }
        const exisitingUser = await userModel.findById(user);
        //validation
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: 'unable to find user'
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        //creating mongoose session
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        exisitingUser.blogs.push(newBlog)
        await exisitingUser.save({ session })
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            succes: true,
            message: 'Blog Created',
            newBlog
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error While Creating Blog',
            err
        })
    }
};


//updatin blog
module.exports.updateBlogsController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            succes: true,
            message: 'Blog Updated',
            blog
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error While Updating Blog',
            err
        })
    }
};

//get blog by user id
module.exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this id"
            })
        }
        return res.status(200).send({
            succes: true,
            message: 'found the blog',
            blog
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error While getting single Blog',
            err
        })
    }
};

//delete blog
module.exports.deleteBlogsController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id)
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this id"
            })
        }
        return res.status(200).send({
            succes: true,
            message: 'Blog deleted',
            blog
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error While deleting single Blog',
            err
        })
    }
}

//get user blog
exports.userBlogControlller = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error,
        });
    }
};

