import React, { useEffect, useState } from 'react'
import summaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import Changeuserrole from '../components/Changeuserrole';
import Cookies from "js-cookie";

const Allusers = () => {
  const [alluser,setalluser]=useState([]);
  const [openupdaterole,setopenupdaterole]=useState(false);
  const [updatauserdetails,setupdateuserdetails]=useState({
    email:'',
    name:'',
    role:'',
    _id:'',
  })

  const fetchallusers=async()=>{
    const fetchdata=await fetch(summaryApi.all_users.url,{
      method:summaryApi.all_users.method,
      credentials:'include',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type
        'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
        'jwttoken': Cookies.get('token') // Add your custom key-value pair here
      },
    })
    const dataresponse=await fetchdata.json()

    if(dataresponse.success){
      setalluser(dataresponse.data)
    }else if(dataresponse.error){
      toast.error(dataresponse.message)
    }
  }

  useEffect(()=>{
    fetchallusers()
  },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable '>
        <tr className='bg-black text-white'>
          <th>sr</th>
          <th>name</th>
          <th>email</th>
          <th>role</th>
          <th>created date</th>
          <th>edit</th>
          </tr>
          <tbody className=''>
            {
              
              alluser.map((el,index)=>{
                return(
                  <tr >
                        <td >{index + 1}</td>
                        <td >{el?.name}</td>
                        <td >{el?.email}</td>
                        <td >{el?.role}</td>
                        <td >{moment(el?.createdAt).format('ll')}</td>
                        <td>
                          <button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-800 hover:text-white' 
                          onClick={()=>{
                            setupdateuserdetails(el)
                            setopenupdaterole(true)}
                          }
                          >
                            <MdEdit/>
                          </button>
                        </td>

                  </tr>
                )
              })
                
            }
            
          </tbody>
         
      </table>
      {
        openupdaterole &&(<Changeuserrole 
          onclose={()=>setopenupdaterole(false)}
          name={updatauserdetails.name}
          email={updatauserdetails.email}
          roles={updatauserdetails.role}
          userid={updatauserdetails._id}
          callfunc={fetchallusers}
          />)
      }
     
      
    </div>
  )
}

export default Allusers
