import React, { useContext,useEffect, useState } from 'react'
import Context from '../context'
import summaryApi from '../common/index'
import displayINRCurrency from '../helper/displaycurrenct'
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";

const Cart = () => {
    const [data,setdata] = useState([])
    const [loading,setloading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)


    const fetchdata = async() =>{
        
        const response = await fetch(summaryApi.cartproductview.url,{
            method : summaryApi.cartproductview.method,
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type
                'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
                'jwttoken': Cookies.get('token') // Add your custom key-value pair here
              },
        })
       

        const responseData = await response.json()

        if(responseData.success){
            setdata(responseData.data)
        }


    }

    const handleloading = async() =>{
        await fetchdata()
    }

    useEffect(()=>{
        setloading(true)
        handleloading()
        setloading(false)
    },[])


    const increaseQty = async(id,qty) =>{
        const response = await fetch(summaryApi.updatecartproduct.url,{
            method : summaryApi.updatecartproduct.method,
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type
                'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
                'jwttoken': Cookies.get('token') // Add your custom key-value pair here
              },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchdata()
        }
    }


    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(summaryApi.updatecartproduct.url,{
                method : summaryApi.updatecartproduct.method,
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type
                    'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
                    'jwttoken': Cookies.get('token') // Add your custom key-value pair here
                  },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchdata()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(summaryApi.deletecartproduct.url,{
            method : summaryApi.deletecartproduct.method,
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type
                'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
                'jwttoken': Cookies.get('token') // Add your custom key-value pair here
              },
            body : JSON.stringify(
                {   
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchdata()
            context.fetchuseraddtocart()

        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productid?.sellingprice) ,0)
  return (
    <div className='container mx-auto'>
        
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-4xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productid?.productimage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productid?.productname}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productid.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productid?.sellingprice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productid?.sellingprice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-lg h-10'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>
    </div>
  )
}

export default Cart
