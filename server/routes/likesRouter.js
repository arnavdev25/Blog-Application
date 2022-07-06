const express = require("express");
const { like, getAllLikes, getCountofOneBlog } = require("../controllers/likesController");

const router = express.Router();

router.post("/",like);
router.get("/",getAllLikes);
router.get("/:id",getCountofOneBlog);

module.exports = router;