const user = require('../models/user')

const updatauser=async(req,res)=>{
    try{

        const sessionuser= req.userid
        const {userid, email,name,role}=req.body
        console.log(userid)
        console.log(email,name,role)

        const payload={
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
        }

        const user1=await user.findById(sessionuser)

        console.log('userrole',user1.role)

        const updateuser=await user.findByIdAndUpdate(userid,payload)

        res.json({
            message:'user updated',
            data:updateuser,
            success:true,
            error:false
        })
    }catch(err){
        res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=updatauser