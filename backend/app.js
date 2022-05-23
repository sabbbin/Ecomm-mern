const express = require("express");

const app=express()
app.use(express.json())

//Impoprt all routers

const allrouters=require('./routes/index')

app.use('/api/v1', allrouters)




module.exports=app