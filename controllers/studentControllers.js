// Get All Students List

const db = require("../config/db")

const getStudents = async (req, res) => {
    try{
       const data = await db.query("SELECT * FROM students");
       if(!data) 
        {
          return res.status(404).send({
            success:false,
            message:"No records Found",
        });
        }
        res.status(200).send({
            success:true,
            message:"All students records",
            totalStudents : data[0].length,
            data: data[0]
        });

    }
    catch(error)
    {
       console.log(error);
       res.status(500).send({
        success:false,
        message:"Error in getting all students API",
        error
       })
    }
}

const getStudentById = async (req, res) => {
    try{
       const studentId = req.params.id;
       if(!studentId) 
        {
          return res.status(500).send({
            success:false,
            message:"Invalid or provide Student Id",
        });
        }
        
        const data = await db.query(`SELECT * FROM students WHERE id=?`,[studentId]);
        console.log(data);
        console.log(data.length);
        if(!data) 
         {
           return res.status(404).send({
             success:false,
             message:"No records Found",
         });
         }
         res.status(200).send({
            success:true,
            studentDetails: data[0],
        });
    }
    catch(error)
    {
       console.log(error);
       res.status(500).send({
        success:false,
        message:"Error in getting all students by ID API",
        error
       })
    }
}

const createStudent = async (req,res) => {
  try{
    const {name,roll_no,fees,classname,medium} = req.body
    if(!name || !roll_no || !fees || !classname || !medium)
      {
        return res.status(500).send({
          success : false,
          message : "Please provide all fields"
        })
      }
      const data = await db.query(`INSERT INTO students (name,roll_no,fees,classname,medium) values (?, ?, ?, ?, ?)`,[name,roll_no,fees,classname,medium])
      if (!data)
        {
          return res.status(404).send({
            success:false,
            message : 'Error in inserting Query'
          })
        }
        res.status(200).send({
          success:true,
          message: 'New Students record created',
        })
    }
  catch(error){
    console.log(error);
    res.status(500).send({
      success : false,
      message: 'Error in creating students in API',
      error
    });

  }
};

const updateStudent = async (req,res) => {
  try{
    const studentId = req.params.id;
    if(!studentId) 
     {
       return res.status(404).send({
         success:false,
         message:"Invalid or provide Student Id",
     });
     }
     const {name,roll_no,fees,classname,medium} = req.body
     const data = await db.query(`UPDATE students SET name = ?, roll_no = ?, fees = ?, classname = ?, medium = ? WHERE id = ?`,[name,roll_no,fees,classname,medium,studentId]);
     if(!data) 
      {
        return res.status(500).send({
          success:false,
          message:"Error in updating record",
      });
      }
      res.status(200).send({
         success:true,
         message : 'Students details updated',
     });
 }
 catch(error)
 {
    console.log(error);
    res.status(500).send({
     success:false,
     message:"Error in Updating students by ID API",
     error
    })
 }
}


const deleteStudent = async (req, res) => {
  try {
    const studentName = req.params.name;

    // Check if studentName is provided
    if (!studentName) {
      return res.status(400).send({
        success: false,
        message: 'Please provide a valid student name'
      });
    }

    // Query database to select students with the given name
    const selectQuery = `SELECT * FROM students WHERE name = ?`;
    const [rows] = await db.query(selectQuery, [studentName]); // Destructure rows from the result

    // Check number of rows returned
    if (rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Student not found'
      });
    } else if (rows.length > 1) {
      return res.status(500).send({
        success: false,
        message: 'Duplicate records found'
      });
    }

    // If exactly one student found, proceed with deletion
    const deleteQuery = `DELETE FROM students WHERE name = ?`;
    await db.query(deleteQuery, [studentName]);

    res.status(200).send({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error) {
    console.error('Error in deleting student by Name API:', error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting student by Name API',
      error: error.message
    });
  }
};


module.exports = {getStudents, getStudentById, createStudent, updateStudent, deleteStudent}