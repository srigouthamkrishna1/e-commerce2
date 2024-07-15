const usermodel =require('../models/user')

const uploadproductpermission=async(userid)=>{
    const user=await usermodel.findById(userid)

    if(user.role==='ADMIN'){
        return true
    }

    return false
}

module.exports= uploadproductpermission