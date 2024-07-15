import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setuserdetails } from "../store/userslice";
import ROLE from "../common/role";
import Context from "../context";
import ecommerce from '../assest/ecomerce.jpg'

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context=useContext(Context)
  const [search,setsearch]=useState("")
  const navigate=useNavigate()

  const [menudisplay, setmenudisplay] = useState(false);

  const handlelogout = async (req, res) => {
    const dataResponse = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      dispatch(setuserdetails(null));
      navigate('/')
    } else {
      toast.error(dataApi.message);
    }
  };
  
  const handlesearch=(e)=>{
    const { value } = e.target
    setsearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className="h-20 shadow-md bg-white fixed w-full z-30">
      <div className="h-full container mx-auto flex items-center px-4 justify-between absolute">
        <div className="">
          <Link to={"/"}>
          <img src={ecommerce} className="relative w-40 h-20 px-0 "/>
          </Link>
        </div>

        <div className="hidden md:flex items-center w-full justify-between max-w-lg border rounded-full focus-within: shadow pl-2">
          <input
            type="text"
            placeholder="search product here"
            className="w-full outline-none"
            onChange={handlesearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <CiSearch />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group flex justify-center">
            {
              user?._id &&(<div className="text-3xl cursor-pointer" onClick={() => setmenudisplay((prev) => !prev)}>
                {
                  user?.profilepic ?(
                    <img src={user?.profilepic} className='w-10 h-10 rounded-full' alt={user?.name} />

                  ): (
                    <FaUser />
                  )                 
                }
                
              </div>)
            }
            
            {menudisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2"
                    >
                      admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {
            (user?._id)&&(
              <div className="text-2xl relative">
              <Link to={'/cart'}>
                <FaShoppingCart />
              </Link>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-xs">{context.cartproductcount}
                </p>
              </div>
            </div>

            )
          }
           {user?._id ? (
            <button
              onClick={handlelogout}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover-bg-red-700"
            >
              logout
            </button>
            ) : (
            <Link to={"/login"}>
              <button className="px-3 py-1 rounded-full text-white bg-red-600 hover-bg-red-700">
                login
              </button>
            </Link>
          )}
         
        </div>

        
      </div>
    </header>
  );
};

export default Header;
