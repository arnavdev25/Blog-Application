const express = require("express");
const { getAllUsers, getOneUser, registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",getAllUsers);
router.get("/:id",getOneUser);

module.exports = router;