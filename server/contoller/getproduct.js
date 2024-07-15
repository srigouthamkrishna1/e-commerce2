const product=require('../models/product')

const getproduct=async(req,res)=>{
    try{
        const allproduct=await product.find().sort({createdAt:-1})

        res.json({
            message:"allproducts",
            data:allproduct,
            success:true,
            error:false
        })

    }catch(err){
        req.status(400).json({
            message:err.message,
            success:false,
            error:true
        })
    }
}
module.exports=getproduct