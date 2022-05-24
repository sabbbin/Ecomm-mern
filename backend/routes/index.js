const router= require('express').Router()

const productRoute= require('./product')
const authRoute= require('./authuser')



router.use('/products',productRoute)
router.use('/user',authRoute)



module.exports=router