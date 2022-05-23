const router= require('express').Router()

const productRoute= require('./product')



router.use('/products',productRoute)



module.exports=router