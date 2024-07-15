import React, { useState } from 'react'
import role from '../common/role'
import { toast } from 'react-toastify'

import {IoMdClose} from 'react-icons/io'
import summaryApi from '../common'
import Cookies from "js-cookie";

const Changeuserrole = ({
  name,
  email,
  roles,
  userid,
  onclose,
  callfunc


}) => {
  const [userrole,setuserrole]=useState(roles)

  const handlechangeselect=(e)=>{
    setuserrole(e.target.value)
    console.log("1",userrole)
    console.log(e.target.value)
  }
  const updatauserrole=async()=>{
    const fetchresponse=await fetch(summaryApi.userupdate.url,{
      method:summaryApi.userupdate.method,
      credentials:'include',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type
        'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
        'jwttoken': Cookies.get('token') // Add your custom key-value pair here
      },
      body:JSON.stringify({
        userid:userid,
        role:userrole
      })
    } )
    console.log(userid,userrole)
    const responsedata=await fetchresponse.json()

    if(responsedata.success){
      toast.success(responsedata.message)
      onclose()
      callfunc()
    }else{
      toast.error(responsedata.message)
    }

    console.log("role updated",responsedata)


   
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <div>
                <button className='block ml-auto' onClick={onclose}>
                <IoMdClose/>
                </button>
            </div>
            <h1 className='pb-4 text-lg font-medium'>change your role</h1>
            <p> Name:{name}</p>
            <p> email:{email}</p>

            <div className='flex items-center justify-between '>
              <p> Role:</p>
              <select className='border px-6 py-1' value={userrole} onChange={handlechangeselect}>
                {
                    Object.values(role).map(el=>{
                        return(
                            <option value={el} key={el}>{el}</option>
                        )
                    })
                }
              </select>
              </div>
              <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updatauserrole}>Change Role</button>
              
        </div>
        
      
    </div>
  )
}

export default Changeuserrole
