const router= require('express').Router()

const  productController = require('../controllers/productController')
const  {isAuthenticatedUser,isAuthorizedRole}= require('../middlewares/authmiddleware')
const productcontroller=new productController()

router.route('/').get(productcontroller.getProduct)
router.route('/admin/new').post( isAuthenticatedUser,isAuthorizedRole('admin'),productcontroller.newProduct)
router.route('/:id')
.get(isAuthenticatedUser,productcontroller.getSingleProduct)
router.route('/admin/:id')
.put(isAuthenticatedUser,isAuthorizedRole('admin'),productcontroller.getUpdateProduct)
.delete(isAuthenticatedUser,isAuthorizedRole('admin'),productcontroller.getDeleteProduct)

module.exports=router