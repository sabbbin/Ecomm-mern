const app= require('./app')
const connectDatabase= require('./config/database')

const dotenve=require('dotenv');

//setting up config file
dotenve.config({path:'backend/config/config.env'})
//connecting to database
connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`server is running :${process.env.PORT} in ${process.env.NODE_ENV} mode `)
})