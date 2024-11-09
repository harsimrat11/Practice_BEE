const express =require("express");
const router=express.Router();

const{
    registerUser,
    userLogin
}=require("../controllers/userController");
// const { generateToken } = require("../middlewares/jwtMiddleware");

//Router for user registeration
router.post("/register",registerUser);

// router.post("/login",userLogin);
router.post("/login" ,userLogin);

module.exports=router;
