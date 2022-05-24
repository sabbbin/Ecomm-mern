const express = require("express");

const app=express()
const errorMiddleware =require('./middlewares/errormiddleware')
app.use(express.json())

//Impoprt all routers

const allrouters=require('./routes/index')

app.use('/api/v1', allrouters)

app.use(errorMiddleware)





module.exports=app