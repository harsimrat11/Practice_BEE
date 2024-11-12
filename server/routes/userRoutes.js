const express =require("express");
const router=express.Router();
const { validateJwtToken } = require("../middlewares/jwtMiddleware");  // Import the middleware

const{
    registerUser,
    userLogin,
    getUserData,
    updateUserData, 
}=require("../controllers/userController");
// const { generateToken } = require("../middlewares/jwtMiddleware");

//Router for user registeration
router.post("/register",registerUser);

// router.post("/login",userLogin);
router.post("/login" ,userLogin);

// // Route to fetch user data by ID 
router.get("/getUserData", validateJwtToken, getUserData);

router.post("/updateUserData", validateJwtToken, updateUserData); 

module.exports=router;
