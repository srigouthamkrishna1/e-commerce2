const addtocart=require('../models/cart')

const addtocartcontroller=async(req,res)=>{
    try{
        const user =req.userid

        const{productid}=req.body

        console.log('user',user)
        console.log('productid',productid)

        const product=await addtocart.findOne({productid,userid:user})

        console.log("product",product)

        if(product){
            return res.json({
                message:'product already exist in cart',
                success:false,
                error:true
            })
        }

        const payload={
            productid:productid,
            quantity:1,
            userid:user
        }
        const newAddToCart = new addtocart(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data:saveProduct,
            message:'product added to cart',
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

module.exports=addtocartcontroller