import {AuthRoute} from "@/components/AuthRoute";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import NotFound404 from "@/pages/NotFound404";
import {createBrowserRouter} from "react-router-dom"

const router = createBrowserRouter([
    {
        path:'/',
        element:<AuthRoute><Layout/></AuthRoute>
            
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