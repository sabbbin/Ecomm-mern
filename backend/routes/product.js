const router= require('express').Router()

const  productController = require('../controllers/productController')

const productcontroller=new productController()

router.route('/').get(productcontroller.getProduct)
router.route('/new').post(productcontroller.newProduct)

module.exports=router