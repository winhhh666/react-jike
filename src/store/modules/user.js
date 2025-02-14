import { request } from "@/utils"
import { createReducer } from "@reduxjs/toolkit"
const userStore = createReducer({
    name:'user',
    initialState:{
        token:''
    },
    //同步修改方法
    reducers: {
        setToken (state, action) {
            state.token = action.payload
        }
    }
})

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        //1.发送异步请求
        const res = await request.post('/authorizations', loginForm)
        //2.提交同步action进行token的存入
        dispatch(setToken(res.data.token));
    }
}

//解构出actionCreater
const {setToken} = userStore.actions;
export {setToken, fetchLogin}
const userReducer = userStore.reducer;
export default userReducer