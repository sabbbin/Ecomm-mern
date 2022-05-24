const mongoose= require('mongoose')
const validator= require('validator')


const userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'please enter your name'],
        maxlength:[30, 'your name canot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true, 'please enter you password'],
        minlength:[6, 'you password mus be longer than 6  charater'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
 
},{timestamps:true})

const User= mongoose.model('User',userSchema)

module.exports=User