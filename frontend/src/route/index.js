import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import Adminpanel from "../pages/Adminpanel";
import Allusers from "../pages/Allusers"
import Products from "../pages/Products";
import Categoryproduct from "../components/Categoryproduct";
import Produtdetails from "../pages/Produtdetails";
import Cart from "../pages/cart";
import Search from "../pages/Search";
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:'forgotpassword',
                element:<Forgotpassword/>
            },{
                path:'signup',
                element:<Signup/>
            },{
                path:'product-category/',
                element:<Categoryproduct/>
                
            },{
                path:'product/:id',
                element:<Produtdetails/>

            },{
                path:'cart',
                element:<Cart/>

            },{
                path:'search',
                element:<Search/>
            },
            {
                path:'admin-panel',
                element:<Adminpanel/>,
                children:[
                    {
                        path:"all-users",
                        element:<Allusers/>
                    },
                    {
                        path:"products",
                        element:<Products/>
                    }
                ]
            }
        ]
    }
]);

export default router;