import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Categorywiseproduct from './Categorywiseproduct'
import summaryApi from '../common'
import VerticalCard from './Verticalcard'
import productcategory from '../helper/ProductCategory'

const Categoryproduct = () => {
    const params=useParams()
    console.log(params)

    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")
    console.log(urlCategoryListinArray)

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")
    
    const fetchData = async()=>{
      const response = await fetch(summaryApi.filterproduct.url,{
        method : summaryApi.filterproduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
}
     console.log("1",selectCategory)
     console.log("3",urlCategoryListObject)

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target
      console.log("1,1",selectCategory)

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
      console.log("2",selectCategory)
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])
    

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])



    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingprice - b.sellingprice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingprice - a.sellingprice))
      }
    }

    useEffect(()=>{
    },[sortBy])
  
  return (
      <div className='container mx-auto p-4'>

       {/***desktop version */}
       <div className='hidden lg:grid grid-cols-[200px,1fr]'>
           {/***left side */}
           <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                {/**sort by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                    <form className='text-sm flex flex-col gap-2 py-2'>
                        <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'asc'}  value={"asc"} onChange={handleOnChangeSortBy}/>
                          <label>Price - Low to High</label>
                        </div>

                        <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnChangeSortBy}/>
                          <label>Price - High to Low</label>
                        </div>
                    </form>
                </div>


                {/**filter by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {
                          productcategory.map((categoryName,index)=>{
                            return(
                              <div className='flex items-center gap-3'>
                                 <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}  />
                                 <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                              </div>
                            )
                          })
                        }
                    </form>
                </div>


           </div>


            {/***right side ( product ) */}
            <div className='px-4 '>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none '>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>
       </div>
       
    </div>
  )
}

export default Categoryproduct
