const addtocart=require('../models/cart')

const updatecart = async(req,res)=>{
    try{
        const currentUserId = req.userid 
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addtocart.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })
        console.log(updateProduct)

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updatecart