// controllers/doctorDetailsController.js
const asyncHandler = require("express-async-handler");
const DoctorDetails = require("../models/doctorsDetailsModel");

const createDoctor = asyncHandler(async (req, res) => {
    const { name, email, specialty, phonenumber, experience, address } = req.body;

    // Validate required fields
    if (!name || !email || !specialty || !phonenumber || !experience || !address) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Check if doctor with the same email or phone number already exists
    const doctorExists = await DoctorDetails.findOne({ $or: [{ email }, { phonenumber }] });
    if (doctorExists) {
        return res.status(400).json({ message: "Doctor with this email or phone number already exists" });
    }

    // Create the doctor record
    const doctor = await DoctorDetails.create({
        name,
        email,
        specialty,
        phonenumber,
        experience,
        address,
    });

    res.status(201).json({
        message: "Doctor registered successfully",
        doctor,
    });
});

module.exports = { createDoctor };
