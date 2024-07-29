const express = require("express");
const Color = require('color');
const morgan = require('morgan');
const dotevn = require("dotenv");
const mySQLPool = require("./config/db");

//Configure
dotevn.config();


//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use
("/api/v1/student", require('./routes/studentRoutes'));
app.get("/test", (req, res) => {
  res.status(200).send("<h1>Welcome Node Js</h1>");
});

//port
const PORT = process.env.PORT || 8000;

//conditional listen
mySQLPool.query('SELECT 1').then(() =>{
//My SQL
console.log("MySql DB Connected")
//listen
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
}).catch((error) => {
   console.log(error);
});




