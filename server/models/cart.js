const mongoose=require('mongoose');

const cartschema=mongoose.Schema({
    productid:{
        ref:'product',
        type:String
    },
    quantity:Number,
    userid:String
},{
    timestamps:true
})

const addtocart=mongoose.model('cart',cartschema)

module.exports=addtocart