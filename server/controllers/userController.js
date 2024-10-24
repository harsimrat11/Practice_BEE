const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")//encrypt the password
const User=require("../models/userModel")
require("dotenv").config()

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,phoneNumber}=req.body

    if(!name || !email || !password || !phoneNumber){
        res.status(400);
        throw new Error("Please provide all fields")
    }

    //check if user already exists
    const userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User already exists"});
    }

    //Hash the password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);

    //create the user
    const user=await User.create({
        name,
        email,
        phoneNumber,
        password:hashedPassword,
    });
    res.status(201).json({message:"User registered Successfully",user});
});
module.exports={registerUser};
