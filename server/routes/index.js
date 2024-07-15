const express=require('express')
const router=express.Router()



const usersignup=require('../contoller/usersignup')
const usersignin=require('../contoller/usersignin')
const authtoken=require('../middleware/authtoken')
const userdetails=require('../contoller/userdetails')
const userlogout=require('../contoller/userlogout')
const allusers = require('../contoller/allusers')
const updatauser = require('../contoller/userupdate')
const uploadproduct = require('../contoller/uploadproduct')
const getproduct = require('../contoller/getproduct')
const updateproduct = require('../contoller/updateproduct')
const getCategoryProduct = require('../contoller/getcategoryproduct')
const getCategoryWiseProduct = require('../contoller/getcategorywiseproduct')
const getproductdetails = require('../contoller/getproductdetails')
const addtocartcontroller = require('../contoller/addtocart')
const countAddToCartProduct = require('../contoller/countcart')
const cartviewproduct = require('../contoller/cartproductview')
const updatecart = require('../contoller/updatecart')
const deletecart = require('../contoller/deletecart')
const search = require('../contoller/search')
const filterProductController = require('../contoller/filterproduct')



router.post('/signup',usersignup)

router.post('/signin',usersignin)
router.get('/user-details',authtoken,userdetails)
router.get('/user-logout',userlogout)

//admin-panel
router.get('/all-users',authtoken,allusers)
router.post('/update-user',authtoken,updatauser)

//product
router.post('/upload-product',authtoken,uploadproduct)
router.get('/get-product',getproduct)
router.post('/update-product',updateproduct)
router.get('/get-categoryproduct',getCategoryProduct)
router.post('/category-wise',getCategoryWiseProduct)
router.post('/product-details',getproductdetails)
router.get('/search',search)
router.post('/filterproduct',filterProductController)


router.post('/addto-cart',authtoken,addtocartcontroller)
router.get('/countcart',authtoken,countAddToCartProduct)
router.post('/cart-product',authtoken,cartviewproduct)
router.post('/updatecart',authtoken,updatecart)
router.post('/deletecart',deletecart)

module.exports=router