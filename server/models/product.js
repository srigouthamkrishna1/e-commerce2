const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productname : String,
    brandname : String,
    category : String,
    productimage : [],
    description : String,
    price : Number,
    sellingprice : Number
},{
    timestamps : true
})


const productmodel = mongoose.model("product",productSchema)

module.exports = productmodel