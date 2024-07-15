const productmodel=require('../models/product')

const updateproduct=async(req,res)=>{

    try{

        const {_id,...resbody}=req.body
    
        const updateproduct=await productmodel.findByIdAndUpdate(_id,resbody)

        console.log("updateproduct",updateproduct)

        res.json({
            message:'product update successfully',
            data:updateproduct,
            success:true,
            error:false
        })



    }catch(err){
        res.status(400).json({
            message:err.message,
            success:false,
            error:true
        })
        
    }
}
module.exports=updateproduct