const{constants}=require("../constants");
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500;

    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed",
                message:error.message,
                stackTrace:err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:error.message,
                stackTrace:err.stack,
            });
            break;
        
        case constants.UNAUTHORISED:
        res.json({
            title:"Unauthorised",
            message:error.message,
            stackTrace:err.stack,
        });//no break as server will be closed

        case constants.SERVER_ERROR:
            res.json({
                title:"Server Error",
                message:error.message,
                stackTrace:err.stack,
        });
        default:
            console.log("no error,All Good")

    }
}
module.exports=errorHandler