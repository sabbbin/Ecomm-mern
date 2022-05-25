const router = require('express').Router()

const {isAuthenticatedUser, isAuthorizedRole} = require('../middlewares/authmiddleware')
const orderController= require('../controllers/orderController')
const ordercontroller= new orderController()

router.route('/register')
.post(isAuthenticatedUser, ordercontroller.registerOrder)
router.route('/single/:id')
.get(isAuthenticatedUser, ordercontroller.getSingleOrder)
router.route('/me')
.get(isAuthenticatedUser, ordercontroller.getMyOrder)
router.route('/admin/getallorder')
.get(isAuthenticatedUser, isAuthorizedRole('admin'),ordercontroller.getAllOrder)

router.route('/admin/:id')
.put(isAuthenticatedUser, isAuthorizedRole('admin'),ordercontroller.updateOrder)
.delete(isAuthenticatedUser, isAuthorizedRole('admin'),ordercontroller.deleteOrderByAdmin)



module.exports=router