import summaryApi from "../common"
import { toast } from 'react-toastify'
import Cookies from "js-cookie";

const addtocart=async (e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()

    const response=await fetch(summaryApi.addtocart.url,{
        method:summaryApi.addtocart.method,
        credentials:'include',
        headers: {
            'Content-Type': 'application/json', // Set the Content-Type
            'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
            'jwttoken': Cookies.get('token') // Add your custom key-value pair here
          },
        body:JSON.stringify({
            productid:id
        })
    })
    const responsedata=await response.json()
    if(responsedata.success){
        toast.success(responsedata.message)
    }else{
        toast.error(responsedata.message)
    }
    return responsedata
}

export default addtocart