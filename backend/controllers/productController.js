


const Product =require('../model/product')
const errorHandler= require('../utils/errorHandler')



class ProductController{
    //get all products => /api/v1/products
    getProduct=(req,res,next)=>{
         Product.find()
         .then((product)=>{
            res.status(200).json({
                success:true,
                data:product,
                msg:'product fetch successfully'
            })
         })
         .catch((er)=>{
             res.json({
                 success:false,
                 data:'null',
                 msg:'error in getting product'
             })
         })
        
    
    }

    //create new product ==> /api/v1/product/admin/new
    newProduct= (req,res,next)=>{
   
   

        const product= new Product(req.body);
        res.status(201).json({
            success:true, 
            product
        })



    }
    //get single product details=> /api/v1/product/:id

    getSingleProduct=(req,res,next)=>{
       
        Product.findById(req.params.id)
        .then((result)=>{
            if (result){

            
            res.status(200).json({
                data:result,
                success:true,
                msg:'Product retrieved successfully'
            })
        } else{
            res.status(404).json({
                data:null,
                success:false,
                msg:'Product not found'
            })
        }
        })
        .catch((err)=>{
            next(new errorHandler('Product not found ', 404))
        })  

    }

    // proudct updatee ==> api/v1/products/admin/:id
    getUpdateProduct=(req,res,next)=>{
        let product= req.body
       

        Product.updateOne({
            _id:req.params.id
        },
        {
            $set:product
        })
        .then((result)=>{
           
            console.log(result.acknowledged)
            res.status(200).json({

                data:result,
                succes:true,
                msg:"product update successfully"
            })
        })
        .catch((err)=>{
            res.json({
                data:null,
                msg:'err in updating product',
                succes:false
            })
        })
    }


    //productDelete== api/v1/product/admin/:id
    getDeleteProduct=(req,res,next)=>{
        Product.deleteOne(
            {_id:req.params.id})
        .then((result)=>{
            res.status(200).json({
                data:result,
                msg:'delete successfully',
                succes:true
            })
        })
        .catch((err)=>{
            res.json({
                data:err,
                msg:'cannot delete data',
                status:false
            })
        })
    }


}


module.exports=ProductController