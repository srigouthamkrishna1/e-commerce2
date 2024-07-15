import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context';
import Cookies from "js-cookie";

const Login = () => {
  const [showpassword,setshowpassword]=useState(true);
  const navigate=useNavigate();
  const {fetchuserdetails,fetchuseraddtocart}=useContext(context)

  const [data,setdata]=useState({
    email:"",
    password:""
  });
  
  const handleonchange=(e)=>{
    const{name,value}=e.target

    setdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handlesubmit=async (e)=>{
        e.preventDefault()
        const dataResponse=await fetch(summaryApi.signin.url,{
          method:summaryApi.signin.method,
          credentials:'include',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type
            'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
            'jwttoken': Cookies.get('token') // Add your custom key-value pair here
          },
          body: JSON.stringify(data)
        })
        const dataApi=await dataResponse.json()
        
        if(dataApi.success){
          console.log("token",dataApi.data)
          Cookies.set('token', dataApi.data);
          toast.success(dataApi.message)
          navigate('/')
          fetchuserdetails()
          fetchuseraddtocart()
        }else{
          toast.error(dataApi.message)
        }
  }
  console.log('data login',data)
  


  return (
    <section id='login'>
        <div className='mx-auto container px-4 mt-5 '>

            <div className='bg-blue-200 p-2 py-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto '>
                  <img src={loginIcons} alt='login icons'/>
                </div>

                <form className='mt-5'
                      onSubmit={handlesubmit}>
                  <div>
                    <label>Email:</label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type='email' 
                            placeholder='enter email'
                            name='email'
                            value={data.email}
                            onChange={handleonchange}
                            className='w-full h-full outline-none bg-transparent'></input>
                    </div>
                  </div>

                  <div>
                    <label>password</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input  
                              type={showpassword? "text":'password'} 
                              placeholder='enter password'
                              value={data.password}
                              name='password'
                              onChange={handleonchange}
                              className='w-full h-full outline-none bg-transparent' ></input>
                        <div className='cursor-pointer text-xl' onClick={()=>setshowpassword((prev)=>!prev)}>
                          <span>
                            {
                                showpassword?(<FaEyeSlash/>)
                                :(<FaEye />)
                            }
                          </span>
                        </div>                    
                    </div>
                    <Link to={'/forgotpassword'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                    forgot-password
                    </Link>
                  </div>

                  <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[100px] rounded-full hover:scale-75 transition-all mx-auto block mt-4'>login</button>
                </form>

                <p className='my-5 '>dont have account? <Link to={'/signup'} className='text-red-700 hover:text-red-300 hover:underline'>signup?</Link></p>




            </div>
        </div>
    </section>
  )
}

export default Login
