const jwt= require('jsonwebtoken')
const crypto= require('crypto')
const generateToken=(user)=>{

       const token= jwt.sign({
            id:user._id
        },
            process.env.JWT_SECRET
        ,{
            expiresIn:process.env.JWT_EXPIRES_TIME
           
        }
)
    return token
}

const resetPassword=(user)=>{
    const resetPasswordToken= crypto.randomBytes(20).toString('hex');
    
    user.resetPasswordToken=crypto.createHash('sha256').update(resetPasswordToken).digest('hex')
  
  user.resetPasswordExpire=Date.now()+30*60*1000000
 
  return resetPasswordToken
}



module.exports={generateToken,resetPassword}