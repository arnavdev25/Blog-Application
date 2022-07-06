const express = require("express");
const { getBlogs, createBlog, getOneBlog, updateBlog, trashItems, deleteBlog, getCategoryBlogs } = require("../controllers/blogsController");


const router = express.Router();


router.get("/category/:cat",getCategoryBlogs)
router.get("/trash",trashItems);
router.get("/",getBlogs);
router.get("/:id",getOneBlog);
router.post("/",createBlog);
router.put("/:id",updateBlog);
router.put("/delete/:id",deleteBlog);


module.exports = router;