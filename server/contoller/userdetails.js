const usermodel =require('../models/user')


const userdetails=async(req,res)=>{
    try{
        const user=await usermodel.findById(req.userid)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details"
        })
    }catch{
        res.status(400).json({
            message:err.message|| err,
            error:true,
            success:false
        })
    }
}
module.exports=userdetails;