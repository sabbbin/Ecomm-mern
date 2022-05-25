const User = require("../model/usermodel");
const passwordHash = require("password-hash");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto')

const { generateToken, resetPassword } = require("../config/generatetoken");

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
          console.log("abc");
          let token = generateToken(result);

          let options = {
            maxAge: 1 * 60 * 100 * 60,
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

  logout = (req, res, next) => {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      msg: "Logged out",
    });
  };
  //forget password => /api/v1/user/forgetpassword
  forgetPassword = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((result) => {
        const resetToken = resetPassword(result);
     

        User.updateOne(
          { _id: result._id },
          {
            $set: result,
          }
        ).
        then((result1) => {
       
          //create reset password url

          const resetUrl = `${req.protocol}://${req.get(
            "host"
          )}/api/v1/user/password/reset/${resetToken}`;
          const message = `your password reset token is as follow :\n\n ${resetUrl}\n\n  if you have not request this email , then ignore it `;
          sendEmail({
            email: result.email,
            subject: "ShopIt password Recovery",
            message: message,
          })
          .then((result2)=>{
            res.json({
              success:true,
              msg:'successful send mail'
            })
          })
        });
      })
      .catch((err) => {
        next("error2 in reseting password");
      });
  };
    //reset password => /api/v1/user/password/reset/:token
   newpassword=(req,res,next)=>{
    
     const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex')
   
     User.findOne({
       resetPasswordToken,
       resetPasswordExpire:{$gt :Date.now()}
     })
     .then((result)=>{
     
       if(req.body.password==req.body.conformpassword){
         User.updateOne({_id:result._id},
          {
            password: passwordHash.generate( req.body.password),
            resetPasswordToken:undefined,
            resetPasswordExpire:undefined
          })
          .then((resul)=>{
            res.status(200).json({
              msg:'password update successful',
              success:true
            })
          })
       }
     })
     .catch((err)=>{
       next('error in updating password')
     })

   }


}

module.exports = UserController;
