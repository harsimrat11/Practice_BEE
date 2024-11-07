const jwt=require('jsonwebtoken');

const createToken=jwt.sign(payload,process.env.PRIVATE_KEY,(err,token)=>{
    if(err)
    {
        console.error("INVALID: ",err.message);
    }
    else
    {
        console.log(token);
    }
})
const validateToken= jwt.verify(token, process.env.PRIVATE_KEY);
{
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log("VALID:", decoded);
        return decoded;
    } 
    catch (err) 
    {
        console.error("INVALID:", err.message);
        return null;
    }
};

// // verify a token symmetric
// jwt.verify(token,  process.env.PRIVATE_KEY, function(err, decoded) {
//   console.log(decoded.foo) // bar
// });

// // invalid token - synchronous
// try {
//   var decoded = jwt.verify(token, 'wrong-secret');
// } catch(err) {
//   // err
// }

// // invalid token
// jwt.verify(token, 'wrong-secret', function(err, decoded) {
//   // err
//   // decoded undefined
// });