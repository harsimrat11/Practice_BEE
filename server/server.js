const express=require("express");
const connectDb=require("./config/dbConnect");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");

connectDb();
const app=express();
const port=processor.env.port||5000;

app.use(express.json());
app.use(cors());


//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});
//APP CONFIG START
app.listen(port,()=>{
    console.log('Server running on port https://localhost:${port}')
})