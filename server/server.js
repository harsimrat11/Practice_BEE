const express=require("express");
const connectDb=require("./config/dbConnect");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");
const dbConnect = require('./config/dbConnect');

//partials
var hbs=require('hbs');
hbs.registerPartials(__dirname+'/views/partials',function(err){});


//env file config 
const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app=express();
const port=process.env.port||5000;

app.use(express.json());
app.use(cors());


//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

//User Registeration
app.use("/api/user",require("./routes/userRoutes"));

// Doctor Details Routes
app.use("/api/doctors", require("./routes/doctorsDetails"));

//APP CONFIG START
app.listen(port,()=>{
    console.log(`Server running on port https://localhost:${port}`);

});

app.get('/home',(req,res)=>{     //  run in http://localhost:5000/home
    res.render('home',{
        username:"Harsimrat",
        posts:"abc"

    })
});

app.get('/allusers', (req, res) => {      //  run in http://localhost:5000/allusers
const users = [
    { name: "Diljit Dosanjh", age: 19 },
    { name: "Karan Aujla", age: 19 },
    { name: "Tarsem Jassar", age: 19 },
    { name: "Sultaan", age: 19 }
];
res.render('home', { users }); 
});


app.set('view engine',"hbs");


