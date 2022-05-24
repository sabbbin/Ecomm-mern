const User = require("../model/usermodel");
const passwordHash = require("password-hash");
const generateToken = require("../config/generatetoken");

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
            maxAge: 360000,
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
}

module.exports = UserController;
