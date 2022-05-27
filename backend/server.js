const app= require('./app')
const connectDatabase= require('./config/database')
const cloudinary= require('cloudinary')
const dotenve=require('dotenv');

process.on('uncaughtException', err=>{  
    console.log(`Error ${err.message}`)
    console.log(`Error ${err.stack}`)

    console.log('shutting down server due to uncaught exception')
    process.exit(1)
})

//setting up config file
dotenve.config({path:'backend/config/config.env'})
console.log('key',process.env.CLOUDINARY_API_KEY)
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
//connecting to database
connectDatabase();
 


 app.listen(process.env.PORT,()=>{
    console.log(`server is running :${process.env.PORT} in ${process.env.NODE_ENV} mode `)
})



