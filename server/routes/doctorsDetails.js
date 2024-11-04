// routes/doctorsDetails.js
const express = require("express");
const router = express.Router();

const {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require("../controllers/doctorsDetailsController");

// Route to create a new doctor
router.post("/register", createDoctor);

// Route to get all doctors
// router.get("/", getDoctors);

// // Route to get a single doctor by ID
// router.get("/:id", getDoctorById);

// // Route to update a doctor by ID
// router.put("/:id", updateDoctor);

// // Route to delete a doctor by ID
// router.delete("/:id", deleteDoctor);

module.exports = router;
