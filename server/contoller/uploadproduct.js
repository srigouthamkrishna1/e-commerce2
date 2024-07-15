
const productmodel=require('../models/product')
const permission =require('../helper/permission')

const uploadproduct=async(req,res)=>{
    try{

        const sessionuserid=req.userid
        if(!permission(sessionuserid)){
            throw new Error('permission denied')
        }
        
        const uploadproduct=new productmodel(req.body)
        const saveproduct=await uploadproduct.save()
        res.status(200).json({
            message:"product created successfully",
            error:false,
            success:true,
            data:saveproduct
        })

    }catch(err){
        res.status(400).json({
            message:err.message,
            success:false,
            error:true
        })
    }

}
module.exports=uploadproduct