const express = require("express");
const { makeComment, getAllComments, getCommentsofOneBlog } = require("../controllers/commentController");

const router = express.Router();

router.post("/",makeComment);
router.get("/",getAllComments);
router.get("/:id",getCommentsofOneBlog);

module.exports = router;