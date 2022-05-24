const User = require("../model/usermodel");
const passwordHash = require("password-hash");
const generateToken = require("../config/generatetoken");
const {resetToken}= require('../config/generatetoken')

class UserController {
  //Register a user=> /api/v1/user/register
  registerUser = (req, res, next) => {
    const user1 = new User(req.body);
    const avatar = {
      public_id: "sdfasdf",
      url: "asfdas",
    };
    user1.avatar = avatar;
    user1.password = passwordHash.generate(user1.password);

    user1
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "user_created successfully",
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  //Login User=> /api/v1/user/login
  loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .select("+password")
      .then((result) => {
        if (passwordHash.verify(password, result.password)) {
          let token = generateToken(result);

          let options = {
            maxAge: 1*60*100*60,
            httpOnly: true,
          };

          res.status(200).cookie("token", token, options).json({
            msg: "successful",
            result,
          });
        } else {
          next("invalid  email or password");
        }
      })
      .catch((error) => {
        next(error);
      });
  };

  //logout user => /api/v1/user/logout

   logout=(req,res,next)=>{
        res.cookie('token',null,{
            maxAge:0,
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            msg:'Logged out'
        })
  }
    //forget password => /api/v1/user/forgetpassword
    forgetPassword=(req,res,next)=>{
        User.findOne({email:req.body.email})
        .then((result)=>{
             const resetToken= resetToken(result)
             result.save()
             then((result1)=>{

                //create reset password url


                const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/user/password/reset/${resetToken}`
                const message=`your password reset token is as follow :\n\n ${resetUrl}\n\n  if you have not request this email , then ignore it `
                    sendEmail({
                        email:result1.email,
                        subject:'ShopIt password Recovery',
                        message:message
                    })
                    .then((result2)=>{
                        res.status(200).json({
                            success:true,
                            msg:`Email sent ot : ${result1.email}`
                        })
                    })
                    .catch((err)=>{
                        result1.resetPasswordToken=undefined
                        result1.resetPasswordExpire=undefined
                        next('error in sending email')
                    })

              
             })
             .catch((err)=>{
                next('error in reseting password')
            })


        })
        .catch((err)=>{
            next('error in reseting password')
        })
    }


}

module.exports = UserController;
