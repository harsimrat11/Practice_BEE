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

const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Hardcoded username and password for simplicity
const correctUsername = "admin";
const correctPassword = "password123";

// Route to handle login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match the hardcoded values
    if (username === correctUsername && password === correctPassword) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Start the server
const port = 5000;  //run on http://localhost:5000/login
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
