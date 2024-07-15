const addtocart=require('../models/cart')

const deletecart=async(req,res)=>{
    try{
        //const currentuser=req.userid
        const productid=req.body._id
        
        const deleteproduct=await addtocart.deleteOne({_id:productid})

        res.json({
            message:'successfully deleted from cart',
            success:true,
            error:false,
            data:deleteproduct
        })
    }catch(err){
        res.status(400).json({
            message:err.message||err,
            success:false,
            error:true,
        })
    }
}
module.exports= deletecart