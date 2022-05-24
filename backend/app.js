const express = require("express");
const cookieParser= require('cookie-parser')
const app = express();

app.use(express.json());
app.use(cookieParser() )

//Impoprt all routers

const allrouters = require("./routes/index");

app.use("/api/v1", allrouters);

app.use((err, req, res, next) => {
    
    let message=''
   if (err.name=='ValidationError'){
       message= Object.values(err.errors).map(value=>value.message)
      console.log(message)
   }
   if (err.name=='CastError'){
       message=`Resouces not found . invalid ${err.path}`
   }

  res.json({
    data: null,
    success: false,
     message:message?message:err
  });
});

module.exports = app;
