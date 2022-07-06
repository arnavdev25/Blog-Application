const Category = require("../models/categoryModel");
const Blog = require("../models/blogmodel");

module.exports.findCategory = async (req, res, next)=>{
    try {
        const categories = req.body.category;
        for(key in categories){
            if(categories[key]){
                const category = await Category.findOne({name:key});
                const updatedUser = await Blog.updateOne({_id:req.body.blog},{$push:{category: category._id}});
            }
        }
        return res.status(200).json({status:true,msg:"Categories has been added successfully"});
    } catch (error) {
        next(error)
    } 
}

module.exports.getAll = async (req, res, next)=>{
    try {
        const all = await Category.find();
        res.status(200).json(all);
    } catch (error) {
        next(error)
    }

}