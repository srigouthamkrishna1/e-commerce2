import React, { useEffect, useState } from 'react'
import image1 from'../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1mobile from '../assest/banner/img1_mobile.jpg'
import image2mobile from '../assest/banner/img2_mobile.webp'
import image3mobile from '../assest/banner/img3_mobile.jpg'
import image4mobile from '../assest/banner/img4_mobile.jpg'
import image5mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";



const Bannerproduct = () => {

    const [currentimage,setcurrentimage]=useState(0)
    
    const desktopimages=[
        image1,
        image2,
        image3,
        image4,
        image5
    ]
    const mobileimages=[
        image1mobile,
        image2mobile,
        image3mobile,
        image4mobile,
        image5mobile
    ]

    const nextimage=()=>{
        if(currentimage<desktopimages.length-1){
            setcurrentimage(prev=>prev+1)
        }

    }
    const previmage=()=>{
        if(currentimage!=0){
            setcurrentimage(prev=>prev-1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopimages.length - 1 > currentimage){
                nextimage()
            }else{
                setcurrentimage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentimage])
  return (
    <div className='container mx-auto px-4 rounded '>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className='flex justify-between w-full text-2xl'>
                <button onClick={previmage} className='bg-white shadow-md rounded-full p-1 hover:bg-green-500 '><FaAngleLeft/></button>
                <button onClick={nextimage} className='bg-white shadow-md rounded-full p-1 hover:bg-green-500'><FaAngleRight/></button>
            </div>

        </div>







        <div className='hidden md:flex h-full w-full overflow-hidden'>
        {
            desktopimages.map((imageurl,index)=>{
                return(
                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageurl} style={{transform : `translateX(-${currentimage * 100}%)`}}>
                        <img src={imageurl} className='w-full h-full'/>
                    </div>
                )
            })
        }

        </div>


        <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileimages.map((imageurl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageurl} style={{transform : `translateX(-${currentimage * 100}%)`}}>
                                <img src={imageurl} className='w-full h-full object-cover'/>
                            </div>
                            )
                        })
                }
              </div>
        
        
        

      </div>
    </div>
  )
}

export default Bannerproduct