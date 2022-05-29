const express = require("express");
const cookieParser= require('cookie-parser')
const app = express();
const cors= require('cors')

const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(cookieParser() )



//seting up cloudinary configuration


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
     msg:message?message:err
  });
});

module.exports = app;
