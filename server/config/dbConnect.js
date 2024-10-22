const mongoose=require("mongoose")
const connectDb=async()=>{
    try{
        const connect =await mongoose.connect(process.env.CONNECTION_STRING);   
        console.log("Database Conected:",connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);//terminates the process immediately , 1 means failed, 0 means success
    }
};
module.exports=connectDb;