//GET NEWSLETTER ,POST NEWSLETTER
const asyncHandler=require("express-async-handler");
const Newsletter=require("../model/newsletterModel");
//newsletter ko get kaise krein
const getNewsletter=asyncHandler(async(req,res)=>{
try{
    const data=await Newsletter.find({});
    res.send()
}    
catch(err){
    return res.status(404).json({err:err,message})
}
})

const createNewsletter=asyncHandler(async(req,res)=>{

})
module.exports={getNewsletter,createNewsletter}