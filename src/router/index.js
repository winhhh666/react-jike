import {AuthRoute} from "@/components/AuthRoute";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import NotFound404 from "@/pages/NotFound404";
import Publish from "@/pages/Publish";
import {createBrowserRouter} from "react-router-dom"

const router = createBrowserRouter([
    {
        path:'/',
        element:<AuthRoute><Layout/></AuthRoute>,
        children:[
            {
                index: true,
                element:<Home></Home>
            },
            {
                path:"article",
                element:<Article></Article>
            },
            {
                path:"publish",
                element:<Publish></Publish>
            }
        ]
            
    },
    {
        path:'/login',
        element:(<Login/>)
    },
    {
        path:'/*',
        element:<NotFound404></NotFound404>
    }
])

export default router;