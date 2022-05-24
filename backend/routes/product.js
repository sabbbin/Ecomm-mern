const router= require('express').Router()

const  productController = require('../controllers/productController')

const productcontroller=new productController()

router.route('/').get(productcontroller.getProduct)
router.route('/admin/new').post(productcontroller.newProduct)
router.route('/:id')
.get(productcontroller.getSingleProduct)
router.route('/admin/:id')
.put(productcontroller.getUpdateProduct)
.delete(productcontroller.getDeleteProduct)

module.exports=router