const productmodel=require('../models/product')

const getproductdetails=async(req,res)=>{
    try{
        const {productid}=req.body

        const product=await productmodel.findById(productid)

        res.json({
            message:"product details successfully collected",
            data:product,
            success:true,
            error:false
        })

    }catch(err){
        res.status(404).json({
            message:err?.message ||err,
            success:false,
            error:true
        })
    }
}

module.exports=getproductdetails