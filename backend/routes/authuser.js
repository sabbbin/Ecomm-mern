const router= require('express').Router()


const authController= require('../controllers/authController')
const {isAuthenticatedUser} = require('../middlewares/authmiddleware')
const authcontroller=new authController()



router.route('/register')
.post(authcontroller.registerUser)
router.route('/login')
.post(authcontroller.loginUser)
router.route('/logout')
.get(isAuthenticatedUser,authcontroller.logout)
router.route('/forgetpassword')
.post(authcontroller.forgetPassword)



module.exports=router 