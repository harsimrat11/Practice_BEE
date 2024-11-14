const express = require("express")
const router = express.Router()
const {getNewsletter,createNewsletter}=require("../controllers/newsletterController");
const { validateToken } = require("../middleware/jwtMiddleware");


router.get("/",getNewsletter);
router.post("/",validateToken,createNewsletter);