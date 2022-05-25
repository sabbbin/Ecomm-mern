const router= require('express').Router()

const productRoute= require('./product')
const authRoute= require('./authuser')
const orderRoute=require('./orderRoutes')



router.use('/products',productRoute)
router.use('/user',authRoute)
router.use('/order',orderRoute)



module.exports=router