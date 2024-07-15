import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchcategorywise from '../helper/fetchcategorywise'
import displayINRCurrency from '../helper/displaycurrenct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addtocart from '../helper/addtocart'
import Context from '../context'

const Horizontalcomponent = ({
    category,
    heading
}) => {
    const [data,setdata]=useState([])
    const [loading,setloading]=useState(false)
    const loadinglist=new Array(13).fill(null)

    const {fetchuserdetails,fetchuseraddtocart}=useContext(Context)

    const handleaddtocart = async(e,id)=>{
        await addtocart(e,id)
        fetchuseraddtocart()
     }


    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()



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
    <div className='container mx-auto p-6 mt-6 relative' > 
        <h2 className='text-2xl font-bold py-4' > {heading}</h2>
        <div className='flex items-center gap-4 md:gap-10 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
        <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 
        {
            loading?(
                loadinglist.map((product,index)=>{
                    return(
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })

            ):(
                data.map((product,index)=>{
                    return(
                        <Link to={'/product/'+product?._id} className='flex gap-5 w-full min-w-[280px] md:min-w-[320px]   max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-flex'>
                            <div className='bg-slate-200 h-full p-4 max-w-[120px] md:max-w-[145px] hover:scale-90 transition-all'>
                            <img src={product?.productimage[0]} className='object-scale-down h-full'/>
                            </div>
                            <div className='p-4 '>
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

export default Horizontalcomponent
