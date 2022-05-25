const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your product name'],
        trim:true,
        maxlength:[100,'Product name cannot exist 100 characters']

    },
    price:{
        type:Number,
        required:[true, 'please enter product price'],
        maxlength:[5, 'product name cannot exceed 5 charaters'],
        default:0.0
    },
    description:{
        type:String,
        required:[true, 'please enter product description']
          
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'Please slect category for this products'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Beauty/Health',
                'Sports',
                'outdoors',
                'Home'
            ],
            message:'please select correct category for product'
        }
    },
    seller:{
        type:String,
        required:[true, 'please enter product seller']
    },
    stock:{
        type:Number,
        required:[true, 'please enter product stocks'],
        maxlength:[5, 'product name cannot exceed 5 charager'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {   user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
            name:{
                type:String,
                required:true 
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        } 
    ],
   
    createdAt:{
        type:Date,
        default:Date.now()
    } 

})


const Product =mongoose.model('Product',productSchema)
module.exports=Product