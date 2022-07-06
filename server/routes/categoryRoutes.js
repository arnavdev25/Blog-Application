const express = require("express");
const { findCategory, getAll } = require("../controllers/categoryController");

const router = express.Router();

router.post("/",findCategory);
router.get("/",getAll);

module.exports = router;