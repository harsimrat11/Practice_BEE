const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")//encrypt the password
const User=require("../models/userModel")
const jwt = require('jsonwebtoken');
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


const userLogin = asyncHandler(async (req,res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400);
        throw new Error("Please fill the fields");
    }

    const user = await User.findOne({ username });
    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    res.status(201).json({message: "User Logged in Successfully", user})

    //jwt user login
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: '1h' });

    // res.status(201).json({message: "User Logged in Successfully", user})
    res.status(201).json({message: "User Logged in Successfully", user, token})

})

module.exports = { registerUser, userLogin }
