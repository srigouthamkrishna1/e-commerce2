const addtocart=require('../models/cart')

const cartviewproduct = async(req,res)=>{
    try{
        const currentUser = req.userid

        const allProduct = await addtocart.find({
            userid : currentUser
        }).populate("productid")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  cartviewproduct