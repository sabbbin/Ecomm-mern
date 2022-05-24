


const Product =require('../model/product')





class ProductController{
    //get all products => /api/v1/products
    getProduct=(req,res,next)=>{
      

        let filter={}
        if (req.query.key){
            filter={
                name:{
                    $regex: req.query.key, 
                    $options:'i'},
               
            }
        }
        if (req.query.category){
            filter['category']={
           
                $regex:req.query.category,
                $options:'i'
           
        }
        }
        if (req.query.price){
            console.log('pirce')
         
         let value=String(req.query.price).split('-')
    
         if (Number(value[0])>Number(value[1])){
            value.reverse()
          
         }
         
         filter['price']={$gte:Number(value[0]),$lte:Number(value[1])}
        }
        if (req.query.page){

            let rowperpage=4
            
            var skiprow=rowperpage*(req.query.page-1)??0
            
        }
       
         Product.find(filter)
         .skip(skiprow)
         .then((product)=>{
            res.status(200).json({
                success:true,
                data:product,
                msg:'product fetch successfully'
            })
         })
         .catch((er)=>{
             next(er)
         })
        
    
    }

    //create new product ==> /api/v1/product/admin/new
    newProduct= (req,res,next)=>{
   
   

        const product= new Product(req.body);
        product.user=req.user.id
        product.save()
        .then((result)=>{

            res.status(201).json({
                success:true, 
                data:result,
                msg:'succesfully register'

            })
        })
        .catch((error)=>{
          
           next(error)
        })



    }
    //get single product details=> /api/v1/product/:id

    getSingleProduct= (req,res,next)=>{
        console.log('result')
       
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
        .catch((error)=>{
           
           next(error)
           
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
        .catch((error)=>{
            let err={
                msg:'error in updating product',
                error:error
            }
           next(err)
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
        .catch((error)=>{
            let err={
                msg:'error in deleting product',
                error:error
            }
           next(err)
        })
    }


}


module.exports=ProductController