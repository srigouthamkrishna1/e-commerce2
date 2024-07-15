import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Admineditproduct from "./Admineditproduct";
import displayINRCurrency from "../helper/displaycurrenct";

const Adminproductcard = ({
    data,
    fetchdata
}) => {
  const [editproduct, seteditproduct] = useState(false);
  
  return (
      <div className="bg-white p-4 rounded">
        <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
        <img src={data?.productimage[0]} width={100} height={100} className='mx-auto object-fill h-full'/>
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.productname}</h1>

        <div>
        
        <p className="font-semibold">
            {
                  displayINRCurrency(data?.sellingprice)

            }
            </p>
        <div
          className="w-fit ml-auto p-2 bg-green-200 rounded-full hover:bg-green-400 hover:text-white"
          onClick={() => seteditproduct(true)}
        >
          <MdModeEdit />
        </div>
        </div>
        </div>
             
            
        {editproduct && (
          <Admineditproduct prod={data} onclose={() => seteditproduct(false)} fetchdata={fetchdata} />
        )}
        
      </div>
      
  );
};

export default Adminproductcard;
