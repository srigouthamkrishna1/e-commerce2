import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryApi from '../common'
import Verticalcomponent from '../components/Verticalcomponent'
import VerticalCard from '../components/Verticalcard'

const Search = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    
    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(summaryApi.search.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)
        console.log("data",dataResponse)

        setData(dataResponse.data)
        console.log(data)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default Search