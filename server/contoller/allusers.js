const userModel =require('../models/user')
const allusers=async(req,res)=>{
    try{


        const allusers=await userModel.find()

        res.json({
            message:"alluser",
            data:allusers,
            success:true,
            error:true
        })
    }catch(err){
         res.status(400).json({
            message:err.message,
            success:false,
            error:true
         })

    }
}
module.exports=allusers