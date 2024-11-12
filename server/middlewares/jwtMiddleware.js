// const jwt=require('jsonwebtoken');

// // const createToken=jwt.sign(payload,process.env.PRIVATE_KEY,(err,token)=>{
// //     if(err)
// //     {
// //         console.error("INVALID: ",err.message);
// //     }
// //     else
// //     {
// //         console.log(token);
// //     }
// // })


// const generateToken=(userData)=>{

//         return jwt.sign(userData,process.env.PRIVATE_KEY);
// }

// // const generateToken = (userData) => {
// //     const { name,email,phoneNumber,password } = userData; // Example of required fields
// //     return jwt.sign({name,email,phoneNumber,password }, process.env.PRIVATE_KEY);
// // };


// const validateJwtToken=(req,res,next)=>
// {
//     //first we are cheching if JWT token is available or not.
//     const authorization=req.headers.authorization;

//     //Output: 1. Bearer wjfewfewofwfewh
//     //Output: 2. wjfewfewofwfewh
//     //Output: 3. blank string
//     //Output: 3, TOKEN IS NOT CREATED, OR LOCAL, SENT THROUGH ENDPOINT TESTING, OR SENT WITHOUT TOKEN HEADER

//     if(!authorization)
//     {
//         return res.status(401).json({err:'Token not available '})
//     }
//     //token fetch
//     // WE ARE STORING TOKEN VALUE FROM HEADERS AND SPLITTING TO GET "BEARER xyz.abc.kjh" to "xyz.abc.kjh"
//     //split the token string from Bearer
//     const token=req.headers.authorization.split(' ')[1];

//     //token provided is wrong ,throw error
//     if(!token){
//         return res.status(401).json({err:'Unauthorised User'});
//     }

//     //handle the error
//     try
//     {
//         const validateToken=jwt.verify(token,process.env.PRIVATE_KEY);

//         req.user=validateToken;
//         next();
//     }
//     catch(err){
//         console.log("Error Occured: ",err.message);
//     }

   
// }
// module.exports= {generateToken,validateJwtToken}

// // const validateToken= jwt.verify(token, process.env.PRIVATE_KEY);
// // {
// //     try {
// //         const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
// //         console.log("VALID:", decoded);
// //         return decoded;
// //     } 
// //     catch (err) 
// //     {
// //         console.error("INVALID:", err.message);
// //         return null;
// //     }
// // };

// // // verify a token symmetric
// // jwt.verify(token,  process.env.PRIVATE_KEY, function(err, decoded) {
// //   console.log(decoded.foo) // bar
// // });

// // // invalid token - synchronous
// // try {
// //   var decoded = jwt.verify(token, 'wrong-secret');
// // } catch(err) {
// //   // err
// // }

// // // invalid token
// // jwt.verify(token, 'wrong-secret', function(err, decoded) {
// //   // err
// //   // decoded undefined
// // });

const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.PRIVATE_KEY, { expiresIn: '1h' });  // Set expiration to 1 hour
};

// Middleware to validate JWT token
const validateJwtToken = (req, res, next) => {
    const authorization = req.headers.authorization;

    // If the token is missing
    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    // Extract token from Authorization header (Bearer <token>)
    const token = authorization.split(' ')[1];

    // If token is not provided
    if (!token) {
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        // Verify token using the PRIVATE_KEY
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;  // Attach user data to request
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.log("Error Occurred:", err.message);
        return res.status(401).json({ err: 'Invalid token' });  // Send error response
    }
};

module.exports = { generateToken, validateJwtToken };
