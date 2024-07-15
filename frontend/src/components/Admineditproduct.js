import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ProductCategory from "../helper/ProductCategory"
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadimage from "../helper/uploadimage"
import { toast } from "react-toastify";

import DisplayImage from './Displayimage';
import { MdDelete } from "react-icons/md";
import summaryApi from "../common";
import Cookies from "js-cookie";

const Admineditproduct = ({
    onclose,
    prod,
    fetchdata
}) => {
    const [data, setData] = useState({
        _id:prod?._id,
        productname: prod?.productname,
        brandname: prod?.brandname,
        category: prod?.category,
        productimage: prod?.productimage,
        description: prod?.description,
        price: prod?.price,
        sellingprice: prod?.sellingprice,
      });
    
      const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
      const [fullScreenImage,setFullScreenImage] = useState("")
    
      const handleUploadProduct = async(e) => {
        const file = e.target.files[0]
        console.log(file)
        const uploadImageCloudinary = await uploadimage(file)
    
    
        setData((preve)=>{
          return{
            ...preve,
            productimage : [ ...preve.productimage, uploadImageCloudinary.url]
          }
        })
      }
    
      const handleDeleteProductImage = async(index)=>{
        console.log("image index",index)
        
        const newProductImage = [...data.productimage]
        newProductImage.splice(index,1)
    
        setData((preve)=>{
          return{
            ...preve,
            productimage : [...newProductImage]
          }
        })
        
      }
    
      const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        setData((preve) => {
          return {
            ...preve,
            [name]: value,
          };
        });
      };
    
       {/**upload product */}
       const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log(data)
        
        const response = await fetch(summaryApi.updateproduct.url,{
          method : summaryApi.updateproduct.method,
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type
            'Authorization': `Bearer ${Cookies.get('token')}`, // Example of adding an Authorization header
            'jwttoken': Cookies.get('token') // Add your custom key-value pair here
          },
          body : JSON.stringify(data)
        })
    
        const responseData = await response.json()
        console.log("responseData",responseData)
    
        if(responseData.success){
          console.log('enterred')
            toast.success(responseData?.message)
            onclose()
            fetchdata()
        }
    
    
        if(responseData.error){
          toast.error(responseData?.message)
        }
      
    
      }
    
    
      return (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <div className=" bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
            <div className="flex justify-between items-center">
              <h2>Upload Product</h2>
              <div
                className="w-fit ml-autoo text-2xl hover:text-red-400 cursor-pointe"
                onClick={onclose}
              >
                <IoMdClose />
              </div>
            </div>
            <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
            <label htmlFor='productname'>Product Name :</label>
                <input 
                  type='text' 
                  id='productname' 
                  placeholder='enter product name' 
                  name='productname'
                  value={data.productname} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  required
                />
    
    
                <label htmlFor='brandname' className='mt-3'>Brand Name :</label>
                <input 
                  type='text' 
                  id='brandname' 
                  placeholder='enter brand name' 
                  value={data.brandname} 
                  name='brandname'
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  required
                />
                <label htmlFor='category' className='mt-3'>Category :</label>
                  <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                      <option value={""}>Select Category</option>
                      {
                        ProductCategory.map((el,index)=>{
                          return(
                            <option value={el.value} key={el.value+index}>{el.label}</option>
                          )
                        })
                      }
                  </select>
                  <label htmlFor='productimage' className='mt-3'>Product Image :</label>
                  <label htmlFor='uploadImageInput'>
                  <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                              <span className='text-4xl'><FaCloudUploadAlt/></span>
                              <p className='text-sm'>Upload Product Image</p>
                              <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                            </div>
                  </div>
                  </label> 
    
                  <div>
                      {
                        data?.productimage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                  data.productimage.map((el,index)=>{
                                    return(
                                      <div className='relative group'>
                                          <img 
                                            src={el} 
                                            alt={el} 
                                            width={80} 
                                            height={80}  
                                            className='bg-slate-100 border cursor-pointer'  
                                            onClick={()=>{
                                              setOpenFullScreenImage(true)
                                              setFullScreenImage(el)
                                            }}/>
    
                                            <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                              <MdDelete/>  
                                            </div>
                                      </div>
                                      
                                    )
                                  })
                                }
                            </div>
                        ) : (
                          <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )
                      }
                      
                  </div>
                
                  <label htmlFor='price' className='mt-3'>Price :</label>
                  <input 
                    type='number' 
                    id='price' 
                    placeholder='enter price' 
                    value={data.price} 
                    name='price'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                  />
    
    
                  <label htmlFor='sellingprice' className='mt-3'>Selling Price :</label>
                  <input 
                    type='number' 
                    id='sellingprice' 
                    placeholder='enter selling price' 
                    value={data.sellingprice} 
                    name='sellingprice'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                  />
    
                  <label htmlFor='description' className='mt-3'>Description :</label>
                  <textarea 
                    className='h-28 bg-slate-100 border resize-none p-1' 
                    placeholder='enter product description' 
                    rows={3} 
                    onChange={handleOnChange} 
                    name='description'
                    value={data.description}
                  >
                  </textarea>
                  <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
    
            </form>
          </div>
                 {/***display image full screen */}
                 {
            openFullScreenImage && (
              <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
           }
        </div>
      );
}

export default Admineditproduct
