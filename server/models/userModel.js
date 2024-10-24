const mongoose=require("mongoose");
const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:[true,"Please add your name"],
        },
        email:{
            type:String,
            require:[true,"Please add your Email"],
        },

        // age:{
        //     type:Number,
        //     require:[true,"Please add your age"],
        // },
        // bloodGroup:{
        //     type:String,
        //     require:[true,"Please add your bloodGroup"],
        // },
        // gender:{
        //     type:String,
        //     require:[true,"Please add your gender"],
        // },
        phoneNumber:{
            type:Number,
            require:[true,"Please add your Phone Number"],
        },
        password:{
            type:String,
            require:[true,"Please add your Password"],
        }
       
    
    },
    {
        timestamps:true,
    } 
);
module.exports=mongoose.model("User",userSchema);