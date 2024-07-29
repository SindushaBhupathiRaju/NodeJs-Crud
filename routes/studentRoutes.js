const express = require("express");
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/studentControllers");

// Router Object
const router = express.Router()


// Get All Student List || GET
router.get('/getall', getStudents);

// Get Students by ID
router.get('/get/:id', getStudentById)

// Create students
router.post('/create', createStudent)

//Update student
router.put('/update/:id', updateStudent)

// Delete Student
router.delete('/delete/:name', deleteStudent)


module.exports = router;