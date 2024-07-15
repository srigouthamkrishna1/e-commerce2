import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import {Link } from 'react-router-dom'

const Categorylist = () => {
    const [categoryproduct,setcategoryproduct]=useState([])
    const [loading,setloading]=useState(false)

    const categoryloading=new Array(13).fill(null)

    const fetchcategoryproduct=async()=>{
        setloading(true)
        const response=await fetch(summaryApi.categoryproduct.url)

        const dataresponse=await response.json()
        setloading(false)
        setcategoryproduct(dataresponse.data)
    }
    useEffect(()=>{
        fetchcategoryproduct();

    },[])
  return (
    <div className='container mx-auto p-4 '>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>

            {
                loading ?(
                        categoryloading.map((el,index)=>{
                            return(
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'>
                            </div>
                            )
                        })
                    

                ):(
                    categoryproduct.map((product,index)=>{
                        return(
                            
                            < Link to={'/product-category/?category='+product?.category}className='cursor-pointer'key={product?.category}>
                                <div className=' w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center '>
                                    <img src={product?.productimage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                            
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default Categorylist
