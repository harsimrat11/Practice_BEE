const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")//encrypt the password
const User=require("../models/userModel")
const jwt = require('jsonwebtoken');
require("dotenv").config()
const { generateToken } = require("../middlewares/jwtMiddleware");


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


// const userLogin = asyncHandler(async (req,res) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         res.status(400);
//         throw new Error("Please fill the fields");
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }

//     res.status(201).json({message: "User Logged in Successfully", user})

//     // Generate JWT token
//     const token = jwt.sign(
//         { id: user._id, email: user.email,password: user.password },
//         process.env.PRIVATE_KEY,
//         { expiresIn: '1h' }
//     );

//     // res.status(201).json({message: "User Logged in Successfully", user})
//     console.log(token)
//     res.status(201).json({message: "User Logged in Successfully", user, token})

   
//})


const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill the fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Generate JWT token after successful login
    const token = generateToken({ id: user._id, email: user.email });

    // Send the user info along with the token in the response
    res.status(200).json({
        message: "User Logged in Successfully",
        user,
        token,  // Send token along with user data
    });
});


const getUserData = asyncHandler(async (req, res) => {
    // The user information is attached to the request object by the middleware
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "Success",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        },
    });
});

const updateUserData = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    const userId = req.user.id; // ID from the JWT token

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (password) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user data
    const updatedUser = await user.save();

    res.status(200).json({
        message: "User data updated successfully",
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
        },
    });
});

module.exports = { registerUser, userLogin, getUserData, updateUserData };
//module.exports = { getUserData };

//  //get userdata
//  const getUserData = asyncHandler(async (req, res) => {
//     const { id: userId } = req.body;  
//     // Fetch user by ID
//     const user = await User.findById(id);
//     if (!user) 
//     {
//         res.status(404);
//         throw new Error("not found");
//     }

//     res.status(200).json({
//         message: "Success",
//         user: 
//         {
//             id:user._id,
//             name:user.name,
//             email:user.email,
//             phoneNumber:user.phoneNumber,
//         },
//     });
// });
// module.exports = { registerUser, userLogin }
//  module.exports = { registerUser, userLogin, getUserData };
