
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setuserdetails } from './store/userslice';
import Cookies from "js-cookie";

function App() {
  const dispatch=useDispatch()
  const [cartproductcount,setcartproductcount] = useState(0)





  const fetchuserdetails=async()=>{

    const dataresponse=await fetch(summaryApi.current_user.url,{
      method:summaryApi.current_user.method,
      credentials:'include',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type
        'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
        'jwttoken': Cookies.get('token') // Add your custom key-value pair here
      },
    })
    const dataApi=await dataresponse.json()

    if(dataApi.success){
      console.log('enterred')
      console.log("user",dataApi)
      dispatch(setuserdetails(dataApi.data))
    }
    
  }

  const fetchuseraddtocart = async()=>{
    const dataResponse = await fetch(summaryApi.countcart.url,{
      method : summaryApi.countcart.method,
      credentials : 'include',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type
        'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
        'jwttoken': Cookies.get('token') // Add your custom key-value pair here
      },
    })

    const dataApi = await dataResponse.json()
    console.log("cart",dataApi)

    setcartproductcount(dataApi?.data?.count)
  }

  useEffect(()=>{
    fetchuserdetails()
    fetchuseraddtocart()
  },[])


  return (
    <>
    <Context.Provider value={{
      fetchuserdetails,
      cartproductcount,
      fetchuseraddtocart
    }}>
    <ToastContainer
    position='top-center'
    />
    
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16'>
      <Outlet/>
    </main>

    
    <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
