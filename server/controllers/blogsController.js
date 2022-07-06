const Blog = require("../models/blogmodel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");

module.exports.createBlog = async(req,res,next)=>{
    try {
        const blog = await Blog.create(req.body);
        const updatedUser = await User.updateOne({_id:blog.user},{$push: {blogs: blog._id}});
       
        return res.status(201).json({
            status: true,
            msg: "Blog created successfully",
            blog
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getBlogs = async (req, res, next)=>{
    try {
        const blogs = await Blog.find().populate("user").populate("category").populate("likes").populate("comments");
        return res.status(200).json(blogs);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneBlog = async (req, res, next)=>{
    try {
        const blog = await Blog.findOne({_id: req.params.id}).populate("category").populate("user").populate("likes").populate("comments").populate("comments.user","user");
        console.log(blog);
        if(!blog) return res.status(404).json({status: false, msg: "No such blog found"})
        return res.status(200).json({
            status: true,
            blog
        })
    } catch (error) {
        res.status(404).json({status: false, msg: "No such blog found"});
    }
}

module.exports.updateBlog = async (req, res, next)=>{
    try {
        const blogId = req.params.id;
        const {title,body} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,{
            title: title,
            body: body,
            updatedAt: Date(new Date().toLocaleTimeString()),
        });
        return res.status(200).json({
            status: true,
            msg: "Blog updated Successfully!",
        })
    } catch (error) {
        next(error)
    }
}

module.exports.trashItems = async(req, res, next)=>{
    try {
        const blogs = await Blog.find({deleted: true});
        return res.status(200).json(blogs);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteBlog = async(req, res, next)=>{
    try {
        const blogId = req.params.id;
        const deletedBlog = await Blog.findByIdAndUpdate(blogId,{
            deleted: true,
        })
        return res.status(200).json({
            status: true,
            msg: "Moved to trash",
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getCategoryBlogs = async (req, res, next)=>{
    try {
        const catId = await Category.find({name:req.params.cat})
        const blogs = await Blog.find({category: catId[0]._id}).populate("category").populate("likes").populate("comments");
        res.json(blogs);
    } catch (error) {
        next(error)
    }
}

