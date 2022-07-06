const Like = require("../models/likesModel");
const Blog = require("../models/blogmodel");

module.exports.like = async (req, res, next)=>{
    try {
        const like = await Like.create(req.body);
        const blog = await Blog.updateOne({_id:req.body.blog},{$push:{likes: like._id}})
        return res.status(200).json({
            msg:"Blog liked",
            like
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getAllLikes = async (req, res, next)=>{
    try {
        const likes = await Like.find().populate("blog").populate("user")
        return res.status(200).json(likes)
    } catch (error) {
        next(error)
    }
}

module.exports.getCountofOneBlog = async (req, res, next)=>{
    try {
        const likes = await Like.find({blog : req.params.id}).count();
        return res.status(200).json({
            total_likes: likes
        })
    } catch (error) {
        next(error)
    }
}