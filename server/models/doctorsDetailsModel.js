// models/doctorDetailsModel.js
const mongoose = require('mongoose');

const doctorDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true,"Please add your name"],
        trim: true
    },
    email:
    {
        type:String,
        require:[true,"Please add your email"],
        trim:true
    },
    specialty: {
        type: String,
        require: [true,"Please add your speciality"],
        trim: true
    },
    phonenumber: {
        type: String,
        require: [true,"Please add your phone number"],
        trim: true,
        unique: true
    },
    experience: {
        type: Number,
        require: [true,"Please add your experience"],
        min: 0
    },
    address: {
        type: String,
        require: [true,"Please add your address"],
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('DoctorDetails', doctorDetailsSchema);
