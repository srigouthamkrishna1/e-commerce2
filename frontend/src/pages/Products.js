
import React, { useEffect, useState } from 'react'
import Uploadproduct from '../components/uploadproduct'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import Adminproductcard from '../components/Adminproductcard'
import Cookies from "js-cookie";

const Products = () => {
  const [openuploadproduct,setopenuploadproduct]=useState(false)
  const [allproduct,setallproduct]=useState([])


  const fetchallproduct=async()=>{
    const response=await fetch(summaryApi.allproduct.url,{
      method:summaryApi.allproduct.method,
      credentials:'include',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type
        'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
        'jwttoken': Cookies.get('token') // Add your custom key-value pair here
      },
    })

    const dataresponse=await response.json()
    console.log(dataresponse)

    if(dataresponse.error){
      toast.error(dataresponse.message)
    }
    
    setallproduct(dataresponse?.data )
    
    
  }

  useEffect(()=>{
    fetchallproduct()
    

  },[])
  return (
    <div>
      <div>
      <div className='bg-white px-4 py-2 flex justify-between items-center'>
         <h1 className='font-bold text-lg'>All product</h1>
         <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full transition-all' onClick={()=>setopenuploadproduct(true)}> upload product</button>
      </div>
      {
        openuploadproduct &&(<Uploadproduct onclose={()=>setopenuploadproduct(false)} fetchData={fetchallproduct}/>)
        
      }
      </div>

      {/*all product*/}
      {
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
         
          
          allproduct.map((prod,index)=>{
              console.log("inside",prod)
            return(
              <Adminproductcard data={prod} key={index +'allproduct'} fetchdata={fetchallproduct}/>

            
              


            );
          })
        }

      </div>
}
      

    
      
    </div>
  )
}

export default Products
