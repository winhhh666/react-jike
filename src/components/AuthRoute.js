
//封装高阶组件
//有token就正常跳转， 无token就跳转登录页
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom";
export function AuthRoute ({children}) {
    const token = getToken();
    if(token){
        return <>{children}</>
    }else {
        return <Navigate to={"/login"} replace />
    }
}
