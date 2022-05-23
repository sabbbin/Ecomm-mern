const mongoose= require('mongoose')


const connectDatabase= ()=>{
    mongoose.connect(process.env.DB_LOCAL_URL
     
    ).then((con)=>{
        console.log(`MongoDB database connected with HOST:${con.connection.host}` )
    })
    .catch(err=>{
        console.log('erro in connection ',err)
    })
}

module.exports=connectDatabase