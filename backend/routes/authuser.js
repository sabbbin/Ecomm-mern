const router= require('express').Router()


const authController= require('../controllers/authController')
const {isAuthenticatedUser, isAuthorizedRole, isSelfDeleted} = require('../middlewares/authmiddleware')
const authcontroller=new authController()



router.route('/register')
.post(authcontroller.registerUser)
router.route('/login')
.post(authcontroller.loginUser)
router.route('/logout')
.get(isAuthenticatedUser,authcontroller.logout)
router.route('/forgetpassword')
.post(authcontroller.forgetPassword)

router.route('/password/reset/:token')
.post(authcontroller.newpassword)

router.route('/me')
.get(isAuthenticatedUser,authcontroller.getUserProfile)

router.route('/password/update')
.put(isAuthenticatedUser,authcontroller.getUpdatePassword)

router.route('/me/update')
.put(isAuthenticatedUser,authcontroller.updateUserProfile)

router.route('/admin/getallusers')
.get(isAuthenticatedUser,isAuthorizedRole('admin') ,authcontroller.getAllUsers)

router.route('/admin/specificuser/:id')
.get(isAuthenticatedUser,isAuthorizedRole('admin') ,authcontroller.getSpecicUsers)
.put(isAuthenticatedUser,isAuthorizedRole('admin') ,authcontroller.updateUserProfileByAdmin)
.delete([isAuthenticatedUser,isSelfDeleted() ,isAuthorizedRole('admin')],authcontroller.deleteUserProfileByAdmin)




module.exports=router 