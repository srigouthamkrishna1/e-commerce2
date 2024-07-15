import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imagetobase64 from '../helper/imagetobase64';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showpassword,setshowpassword]=useState(false);
  const [showconfirmpassword,setshowconfirmpassword]=useState(false);
  const navigate=useNavigate()

  const [data,setdata]=useState({
    email:"",
    password:"",
    name:"",
    confirmpassword:"",
    profilepic:""
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

  const handleuploadpic=async(e)=>{
    console.log('started')
    const file=e.target.files[0];
    let imagepic=""
    console.log(file.size)
    if (file.size > 2 * 1024 * 1024) { // 2MB limit

      toast.error('file size should be below 2MB')
    } else {
      imagepic= await imagetobase64(file)
    }


    
    console.log('imagePic',imagepic)

    setdata((prev)=>{
      return{
        ...prev,
        profilepic: imagepic
      }
    })
    console.log("last",data.profilepic)
  
        
    }


  const handlesubmit=async(e)=>{
        e.preventDefault()
        console.log(data)

        if(data.password==data.confirmpassword){
        const dataresponse=await fetch(summaryApi.signup.url,{
          method: summaryApi.signup.method,
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
        const dataApi =await dataresponse.json()
        if(dataApi.success){
          toast.success(dataApi.message);
          navigate('/login')
        }else if(dataApi.error){
          toast.error(dataApi.message);
        }

        
        console.log("data",dataApi)
      }else{
        toast.error('password and confirm password must be same')
      }

  }
  return (
    <section id='signup'>
        <div className='mx-auto container px-4 mt-5 '>

            <div className='bg-blue-200 p-2 py-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
                  <div>
                  <img src={data.profilepic || loginIcons} alt='login icons'/>
                  </div>
                  <form>
                    <label>
                      <div className='text-xs bg-opacity-80 bg-slate-200 py-4 cursor-pointer text-center absolute bottom-0 w-full'>
                        upload photo
                      </div>
                      <input type='file' onChange={handleuploadpic} className='hidden' required />
                    </label>
                  </form>
                </div>

                <form className='mt-5 flex flex-col gap-2'
                      onSubmit={handlesubmit}>

                    <div className='grid'>
                          <label>username</label>
                            <div className='bg-slate-100 p-2'>
                            <input 
                            type='text' 
                            placeholder='enter your name'
                            name='name'
                            value={data.name}
                            onChange={handleonchange}
                            required
                            className='w-full h-full outline-none bg-transparent'></input>
                    </div>
                  </div>

                  <div className='grid'>
                    <label>Email:</label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type='email' 
                            placeholder='enter email'
                            name='email'
                            value={data.email}
                            onChange={handleonchange}
                            required
                            className='w-full h-full outline-none bg-transparent'></input>
                    </div>
                  </div>

                  <div className='grid'> 
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
                  
                  </div>
                  <div className='grid'> 
                    <label>confirm password</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input  
                              type={showconfirmpassword? "text":'password'} 
                              placeholder='confirm password'
                              value={data.confirmpassword}
                              name='confirmpassword'
                              onChange={handleonchange}
                              required
                              className='w-full h-full outline-none bg-transparent' ></input>
                        <div className='cursor-pointer text-xl' onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
                          <span>
                            {
                                showconfirmpassword?(<FaEyeSlash/>)
                                :(<FaEye />)
                            }
                          </span>
                        </div>   
                                         
                    </div>
                  
                  </div>
                  <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[100px] rounded-full hover:scale-75 transition-all mx-auto block mt-4'>login</button>
                </form>

                <p className='my-5 '>already have account? <Link to={'/login'} className='text-red-700 hover:text-red-300 hover:underline'>login?</Link></p>




            </div>
        </div>
    </section>
  )
}

export default Signup
