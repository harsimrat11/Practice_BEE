const express =require("express");
const router=express.Router();

const{
    registerUser,
    login
}=require("../controllers/userController");

//Router for user registeration
router.post("/register",registerUser);

module.exports=router;
