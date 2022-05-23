


const Product =require('../model/product')




class productController{

    getProduct=(req,res,next)=>{
    
        res.status(200).json({
            sucess:true,
            message:'This route will show all product in database'
        })
    
    }

    //create new product ==> /api/v1/product/new
    newProduct= (req,res,next)=>{
        console.log('hello')

        const product= new Product(req.body);
        res.status(201).json({
            success:true, 
            product
        })



    }


}


module.exports=productController