const bcrypt = require('bcryptjs');
const userModel= require('../models/user')

const userSignup=async(req,res)=>{
    try{
        const {email,password,name}=req.body;
        
        const user= await userModel.findOne({email})

        if(user){
            throw new Error('Already user exist')
        }
        if(!email){
            throw new Error('please provide email')
        }
        if(!password){
            throw new Error('please provide password')
        }
        if(!name){
            throw new Error('please provide username')
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);

        if(!hashpassword){
            throw new Error('something is wrong')
        }

        const payload={
            ...req.body,
            profilePic:req.body.profilepic,
            role:"GENERAL",
            password:hashpassword
        }


        const userData=new userModel(payload)
        const saveUser= await userData.save()

        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:'user created successfully'
        })
    }catch(err){
        res.json({
            message:err.message ||err,
            error:true,
            success:false,
        })
    }
}

module.exports =userSignup;