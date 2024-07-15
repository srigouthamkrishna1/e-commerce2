const addtocart = require("../models/cart")

const countAddToCartProduct = async(req,res)=>{
    try{
        const userid = req.userid

        const count = await addtocart.countDocuments({
            userid : userid
        })

        res.json({
            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })
    }catch(error){
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
}

module.exports = countAddToCartProduct