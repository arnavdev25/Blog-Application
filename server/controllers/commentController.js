const Comment = require("../models/commentsModel");
const Blog = require("../models/blogmodel");

module.exports.makeComment = async (req, res, next)=>{
    try {
        const comment = await Comment.create(req.body);
        const blog = await Blog.updateOne({_id:req.body.blog},{$push:{comments: comment._id}});
        return res.send(comment);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllComments = async (req, res, next)=>{
    try {
        const comment = await Comment.find();
        return res.send(comment);
    } catch (error) {
        next(error)
    }
}

module.exports.getCommentsofOneBlog = async (req, res, next)=>{
    try {
        const counts = await Comment.find({blog: req.params.id}).count();
        const comments = await Comment.find({blog: req.params.id}).populate("user");
        return res.status(200).json({
            total: counts,
            comments
        });
    } catch (error) {
        next(error)
    }
}