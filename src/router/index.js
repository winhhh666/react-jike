import {AuthRoute} from "@/components/AuthRoute";
// import Article from "@/pages/Article";
// import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import NotFound404 from "@/pages/NotFound404";
// import Publish from "@/pages/Publish";
import { lazy, Suspense } from "react";
import {createBrowserRouter} from "react-router-dom"
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))
const Home = lazy(() => import('@/pages/Article'))
const router = createBrowserRouter([
    {
        path:'/',
        element:<AuthRoute><Layout/></AuthRoute>,
        children:[
            {
                index: true,
                element:<Suspense fallback={'加载中'}><Home></Home></Suspense> 
            },
            {
                path:"article",
                element:<Suspense  fallback={'加载中'}><Article></Article></Suspense>
            },
            {
                path:"publish",
                element:<Suspense  fallback={'加载中'}><Publish></Publish></Suspense>
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