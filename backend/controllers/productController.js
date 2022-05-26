


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

    //create new review => /api/v1/product/review
  createProductReview=(req,res,next)=>{
      const { rating, comment, productId}= req.body;
      const review= {
          user:req.user._id,
          name:req.user.name,
          rating:Number(rating),
          comment
      }
      Product.findById(productId)
      .then((result)=>{
            const isreviewed= result.reviews.find(r=>r.user.toString()=== req.user._id.toString())
            if (isreviewed){
                    result.reviews.forEach(review=>{
                        if (review.user.toString()===req.user._id.toString()){
                            review.comment=comment;
                            review.rating=rating;
                        }
                    })
            }
            else{
                result.reviews.push(review)
                result.numOfReviews=result.reviews.length
            }
            result.rating=result.reviews.reduce((acc,item)=>item.rating+acc,0)/result.reviews.length
          
            Product.updateOne({_id:productId},{
                $set:result
            })
            .then((result1)=>{
                res.status(200).json({
                    result1,
                    msg:'successfull',
                    success:true
                })
            })
            .catch((err)=>next('cannot update rating'))

     
        })
        .catch(err=>next('unsuccessful'))
  }
/// get Product reviews =. /api/v1/products/review/all
    getAllProductReviews=(req,res,next)=>{
       

        Product.findById(req.query.id)
        .then((result)=>{

            
                
                res.status(200).json({
                    success:true,
                    reviews:result.reviews
                })
          

        })
        .catch((err)=>next('error'))
    }
  //delete Product reviews == /api/v1/products/review
    deleteReview=(req,res,next)=>{
        Product.findById(req.query.id)
        .then((result)=>{
            
            
            const reviews= result.reviews.filter(review=>review.user.toString() !== req.user._id.toString())
            const numOfReviews= reviews.length
            let rating=reviews.reduce((acc,item)=>item.rating+acc,0)/reviews.length
            if (reviews.length===0){
                rating=0
            }
          
           
        Product.findByIdAndUpdate({_id:req.query.id},{reviews,rating,numOfReviews})
        .then((result2)=>{
            res.status(200).json({
                success:true,
                msg:'review update successfull'
            })
        })
        .catch(err=>next(err))
        })
        .catch(err=>next(err))
    }

}


module.exports=ProductController