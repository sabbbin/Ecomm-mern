const router= require('express').Router()


const authController= require('../controllers/authController')
const authcontroller=new authController()



router.route('/register')
.post(authcontroller.registerUser)
router.route('/login')
.post(authcontroller.loginUser)



module.exports=router 