const User = require("../model/usermodel");
const passwordHash = require("password-hash");
const sendEmail = require("../utils/sendEmail");

const crypto = require('crypto')
const  uploaditem  =require( "../config/uploadfile");

const { generateToken, resetPassword } = require("../config/generatetoken");

class AuthController {
  //Register a user=> /api/v1/user/register
  registerUser = (req, res, next) => {
   
    const {name, email, password} = req.body;
 
    uploaditem(req.body.avatar)
     .then((result)=>{
     
      let avatar={
         public_id: result.url,
         url:result.secure_url
       }
           
    let user= new User({name,email,password,avatar})
    user.password = passwordHash.generate(user.password);
       user
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
     })
     .catch((err)=>{
       console.log('error ')
       next('error in uploading image')})


   
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
            maxAge: 1 * 60 * 100000 * 60,
            httpOnly: true,
          };

          res.status(200).cookie("token", token, options).json({
            msg: "successful",
            result,
            success:'true'
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
          }).catch(err=>next(err))
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
          .catch(err=>next(err))
       }
     })
     .catch((err)=>{
       next('error in updating password')
     })

   }

   //get user profile 

   getUserProfile=(req,res,next)=>{
  

    User.findOne(req.user._id)
    .then((result)=>{
        res.status(200).json({
            success:true,
            result,
            msg:'user retrived successfully'
        })
    })
    .catch((err)=>{
        next('Cannot get user data')
    })
}
//update /change password => /api/v1/user/password/update
 
getUpdatePassword=(req,res,next)=>{
  const password= req.body.oldpassword


  User.findOne(req.user._id)
  .select('+password')
  .then((result)=>{
      if(passwordHash.verify(password,result.password)){
        result.password= passwordHash.generate(req.body.password)
        User.updateOne({_id:result._id},{
          $set:result
        })
        .then((result11)=>{
          res.json({

            success:true,
            msg:"password update successfully"
          })
        })
        .catch(err=>next(err))

      }
      else{
        next('password doesnot map')
      }
        
  })
  .catch((err)=>{ 
      next('Password cannot be updated')
  })
}

//update user profile => /api/v1/me/update
updateUserProfile=(req,res,next)=>{
  const user= req.body
  // avatar :todo
  User.updateOne({_id:req.user._id},{
    email:user.email,
    name:user.name
  })
  .then((result)=>{
    console.log(result)
    res.json({
      success:true,
      msg:'user update successfully'
    })
  })
  .catch((err)=>{
    next('Cannot update user profile')
  })
}
//get all users=> /api/v1/user/admin/getallusers
   getAllUsers=(req,res,next)=>{
    User.find()
    .then((result)=>{
      res.status(200).json({
        result,
        msg:'retrived all user successfully',
        success:true
      })
    })
    .catch((err)=>{
      next('cannot get all users')
    })
   }

   //get all users=> /api/v1/user/admin/specificuser/:id
   getSpecicUsers=(req,res,next)=>{
     console.log(req.params.id)
    User.findById(req.params.id)
    .then((result)=>{
      res.status(200).json({
        result,
        msg:'retrived all user successfully',
        success:true
      })
    })
    .catch((err)=>{
      next('cannot get specified users')
    })
   }

   //update user profile by admin => /api/v1/user/admin/specific/:id
   updateUserProfileByAdmin=(req,res,next)=>{
     const user= req.body
     // avatar :todo
     User.updateOne({_id:req.params.id},{
       name:user.name,
       email:user.email,
       role:user.role
     })
     .then((result)=>{
       console.log(result)
       res.json({
         success:true,
         msg:'user update successfully by admin'
       })
     })
     .catch((err)=>{
       next('Cannot update user profile by admin')
     })
   }
   //delete user profile by admin => /api/v1/user/admin/specific/:id
   deleteUserProfileByAdmin=(req,res,next)=>{
    const user= req.body
    // avatar :todo
    User.deleteOne({_id:req.params.id})
    .then((result)=>{
  
      res.json({
        success:true,
        msg:'user delete successfully by admin'
      })
    })
    .catch((err)=>{
      next('Cannot delte user profile by admin')
    })
  }
}

module.exports = AuthController;
