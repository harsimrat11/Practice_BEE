const express=require("express");
const connectDb=require("./config/dbConnect");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");
const path = require('path');
const jwt = require('jsonwebtoken');

const dbConnect = require('./config/dbConnect');
//multer
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' }) //run multer on thunderclient (get) http://localhost:5000/home



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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


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



// app.get('/home',(req,res)=>{     //  run in http://localhost:5000/home
//     res.render('home',{
//         username:"Harsimrat",
//         posts:"abc"

//     })
// });
app.get('/home', async (req, res) => {
    try {
        const profile = await Upload.findOne().sort({ _id: -1 }); // Fetch the latest profile
        res.render('home', { profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send("Error fetching profile.");
    }
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

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.body);
//     console.log(req.file);
//     return res.redirect("/home");

//   })

//code to implement  MUlter in mongodb
// app.post('/profile', upload.single('avatar'), async (req, res, next) => {
//     try {
//         console.log(req.file);
//         const file = new File({
//             filename: req.file.filename,
//             path: req.file.path,
//         });
//         await file.save();
//         res.redirect("/home");
//     } catch (error) {
//         console.error("Error saving file to database:", error);
//         res.status(500).send("Error saving file");
//     }
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

const uploads = multer({ storage: storage })

const Upload = require("./models/UploadModel")

// app.post("/profile", upload.single('avatar'), async (req, res, next) => {
//     try {
//         const profileData = {
//             avatar: {
//                 fileName: req.file.filename, // Use req.file.filename for file name
//                 filePath: req.file.path,     // Use req.file.path for file path
//             },
//         };

//         const newProfile = new Upload(profileData);
//         await newProfile.save();

//         console.log("Profile saved:", newProfile);
//         res.redirect("/home");
//     } catch (error) {
//         console.error("Error saving profile:", error);
//         res.status(500).send("Error saving profile.");
//     }
// });
app.post("/profile", upload.single('avatar'), async (req, res) => {
    try {
        const profileData = {
            avatar: {
                fileName: req.file.filename,
                filePath: req.file.path,
            },
        };

        const newProfile = new Upload(profileData);
        await newProfile.save();

        console.log("Profile saved:", newProfile);
        res.redirect("/home");
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).send("Error saving profile.");
    }
});

                                