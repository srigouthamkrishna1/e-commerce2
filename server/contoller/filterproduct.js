const product = require("../models/product")

const filterProductController = async(req,res)=>{
 try{
        const categoryList = req?.body?.category || []

        console.log(categoryList)

        const products = await product.find({
            category :  {
                "$in" : categoryList
            }
        })

        res.json({
            data : products,
            message : "product",
            error : false,
            success : true
        })
 }catch(err){
    res.json({
        message : err.message || err,
        error : true,
        success : false
    })
 }
}


module.exports = filterProductController