const productdata=require('../data/product.json')
const dotenv=require('dotenv')

const connectDatabase=require('../config/database')

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const Product =require('../model/product')

const seedProducts=async()=>{

    await Product.deleteMany()

    await Product.insertMany(productdata)
    process.exit();  
}

seedProducts()