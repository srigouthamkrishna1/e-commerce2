const jwt=require('jsonwebtoken')


const authtoken=async(req,res,next)=>{
    try{
        //const token=req.cookies?.token
        //console.log("headers",req.headers['authorization'])
        const token=req.headers.jwttoken



        if(!token){
            return res.status(200).json({
                message:"user not login",
                error:true,
                success:false

            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {

            req.userid=decoded?._id
            next();

          });

        
        
    }catch(err){
        res.status(400).json({
            message:err.message||err,
            data:[],
            error:true,
            success:false
        })

    }
}
module.exports=authtoken