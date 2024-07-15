import React, { useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const Adminpanel = () => {
    const user=useSelector(state=>state?.user?.user)

    const navigate=useNavigate();


  
    

    useEffect(()=>{

      if(user?.role !==ROLE.ADMIN){
        navigate('/')
      }
      

    },[user])






  return (
    <div className='min-h-[calc(100vh-120px)] flex'>
        <aside className='bg-white min-h-full w-full max-w-60  '>
            <div className='h-32 flex bg-red-500 justify-center items-center flex-col'>
            <div className='text-3xl cursor-pointer relative flex justify-center' >
                <FaUser/>
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
            </div>

          <div>
            <nav className='grid p-4'>
                <Link to={'all-users'} className='px-2 py-2 hover:bg-slate-100'>all users</Link>
                <Link to={'products'} className='px-2 py-2 hover:bg-slate-100'>product</Link>
            </nav>
          </div>

        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>

        </main>
    </div>
  )
}

export default Adminpanel
