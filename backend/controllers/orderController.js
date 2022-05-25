const Order = require("../model/order");
const Product = require("../model/product");

class OrderControllers {
  //register order => api/v1/order/register
  registerOrder = (req, res, next) => {
    const order = new Order(req.body);

    (order.paidAt = Date.now()), (order.user = req.user._id);

    order
      .save()
      .then((result) => {
        res.status(200).json({
          msg: "order stored successfully",
          success: true,
          result,
        });
      })
      .catch((err) => {
        next("error");
      });
  };

   //get single order => /api/v1/order/single/:id
   getSingleOrder=(req,res,next)=>{
      
       Order.findById(req.params.id)
       .populate('user', 'name email')
       .then((result)=>{
           res.json({
               result,
               msg:'succesful retrieved order data',
               success:true

           })

       })
       .catch((err)=>{
           next('cannot get order items ')
       })
   }
   //get single order => /api/v1/order/me
   getMyOrder=(req,res,next)=>{
  
    Order.find({user:req.user._id})
    .populate('user', 'name email')
    .then((result)=>{
        res.json({
            result,
            msg:'succesful retrieved your order data',
            success:true

        })

    })
    .catch((err)=>{
        next('cannot get your order items ')
    })
}

   //get allsingle order => /api/v1/order/getall
   getAllOrder=(req,res,next)=>{
  
    Order.find()
    .populate('user', 'name email')
    .then((result)=>{
        let totalAmount=0;
        result.forEach(order=>{
            totalAmount+=order.totalPrice
        })
        res.status(200).json({
            result,
            msg:'succesful retrieved  all order data',
            success:true,
            totalAmount

        })

    })
    .catch((err)=>{
        next('cannot get all order items ')
    })
}
 //update  order status  => /api/v1/order/admin/:id
 updateOrder=(req,res,next)=>{

    Order.findById(req.params.id)

    .then((result)=>{
        if (result.orderStatus=== 'Delivered'){
            next('you have already delivered product')
        }
        result.orderStatus=req.body.status
        result.delieveredAt= Date.now()
        Order.updateOne({_id:result._id},{$set:result})
        .then((result2)=>{
            Product.findOne({_id:result.orderItems[0].product})
            .then((result3)=>{

                Product.updateOne({_id:result3._id},{
                    stock:result3.stock-result.orderItems[0].quantity
                })
                .then((result1)=>{
    
                    res.status(200).json({
                        result1,
                        msg:'succesful update  the order data',
                        success:true,
                   
            
                    })
                })
            })
                
        })
        
        

    })
    .catch((err)=>{
        next('cannot  update order items ')
    })
}

 //delete order by  admin => /api/v1/order/admin/:id
 deleteOrderByAdmin=(req,res,next)=>{
  
    Order.deleteOne({_id:req.params.id})
    
    .then((result)=>{
        res.json({
            result,
            msg:'succesful delete  data',
            success:true

        })

    })
    .catch((err)=>{
        next('cannot delete items ')
    })
}



}

module.exports = OrderControllers;
