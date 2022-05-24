//checks if user is authenticated or not
const jwt= require('jsonwebtoken')
const User= require('../model/usermodel')

const isAuthenticatedUser= (req,res,next)=>{
    const {token}=req.cookies 
    if (!token){
        next('Login first ')
    }
    else{
        const user=jwt.verify(token,process.env.JWT_SECRET)
         User.findById(user.id)
         .then((result)=>{
             req.user=result
             console.log('result',result)
             next()
         })
         .catch((error)=>{
             next(error)
         })

    }
}

const isAuthorizedRole=(...roles)=>(req,res,next)=>{
    
    if (roles.includes(req.user.role)){


        next()
    }
    else{
        next(`${req.user.role}  are not authorized`)
    }
}

module.exports={isAuthenticatedUser,isAuthorizedRole}