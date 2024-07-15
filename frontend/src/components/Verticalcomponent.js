import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchcategorywise from '../helper/fetchcategorywise'
import displayINRCurrency from '../helper/displaycurrenct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addtocart from '../helper/addtocart'
import Context from '../context'

const Verticalcomponent = ({
    category,
    heading
}) => {
    const [data,setdata]=useState([])
    const [loading,setloading]=useState(false)
    const loadinglist=new Array(13).fill(null)
    
    const {fetchuseraddtocart}=useContext(Context)


    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const handleaddtocart = async(e,id)=>{
        await addtocart(e,id)
        fetchuseraddtocart()
     }



    const fetchdata=async()=>{
        setloading(true)
        const categoryproduct=await fetchcategorywise(category)
        setloading(false)

        setdata(categoryproduct?.data)
    }

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

    useEffect(()=>{
        fetchdata()
        
    },[])

  return (
    <div className='container mx-auto p-6 mt-2 relative' > 
        <h2 className='text-2xl font-bold py-4' > {heading}</h2>
        <div className='flex items-center gap-4 md:gap-10 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
        <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 
        {
            loading?(
                loadinglist.map((product,index)=>{
                    return(
                        <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                </div>
                                <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })

            ):(
                data.map((product,index)=>{
                    return(
                        <Link to={'/product/'+product?._id} className='gap-5 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 flex justify-center h-48 p-4 max-w-[280px] md:max-w-[320px] md:h-48 hover:scale-90 transition-all mix-blend-multiply-'>
                            <img src={product?.productimage[0]} className='object-scale-down h-full'/>
                            </div>
                            <div className='p-4 grid gap-2'>
                            <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black  '>{product?.productname}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium '>{ displayINRCurrency(product.sellingprice)  }</p>
                                <p className='text-slate-500 line-through'>{displayINRCurrency(product.price)}</p>
                            </div>
                            <button className='text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full ' onClick={(e)=>handleaddtocart(e,product?._id)}>
                                add to cart
                            </button>
                            </div>
                        </Link>
                    )
                })

            )
            
        }
        </div>

        <div>
        

            </div>


        
      
    </div>
  )
}

export default Verticalcomponent