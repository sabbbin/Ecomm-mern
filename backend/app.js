const express = require("express");
const cookieParser= require('cookie-parser')
const app = express();
const cors= require('cors')
app.use(express.json());
app.unsubscribe(cors())
app.use(cookieParser() )

//Impoprt all routers

const allrouters = require("./routes/index");

app.use("/api/v1", allrouters);

app.use((err, req, res, next) => {
    
    let message=''
   if (err.name=='ValidationError'){
       message= Object.values(err.errors).map(value=>value.message)
     
   }
   if (err.name=='CastError'){
       message=`Resouces not found . invalid ${err.path}`
   }
   if (err.code===11000){
      message=`Duplicate ${Object.keys(err.keyValue) } entered`
   }

  res.json({
    data: null,
    success: false,
     message:message?message:err
  });
});

module.exports = app;
