const userModel=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const usersignin=async(req,res)=>{

    try{
        const {email,password}=req.body;
        if(!email){
            throw new Error("please provide email")
        }
        if(!password){
            throw new Error('plese provide password')
        }

        const user= await userModel.findOne({email})

        if(!user){
            throw new Error('user not found')
        }

        const checkpassword= await bcrypt.compare(password,user.password)
        if(checkpassword){
            const tokendata={
                _id:user._id,
                email:user.email,
            }

            const token= await jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60* 8 });
            const tokenoption={
                httponly:true,
                secure:true
            }
            res.cookie("token",token,tokenoption).json({
                message:"login successfully",
                data:token,
                success:true,
                error:false
            })
        }else{
            throw new Error ('please check password');
        }

    }catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:true
        })
    }

}
module.exports =usersignin