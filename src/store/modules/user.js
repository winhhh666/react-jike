import { getProfileAPI, loginAPI } from "@/apis/user";
import { getToken, setToken as _setToken, removeToken} from "@/utils"
import { createSlice } from "@reduxjs/toolkit"
const userStore = createSlice({
    name:'user',
    initialState:{
        token: getToken() || '',
        userInfo:{}
    },
    //同步修改方法
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            _setToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;

        },
        clearUserInfo(state, action){
            state.token = "";
            state.userInfo={};
            removeToken();
        }
    }
})

//解构出actionCreater
const {setToken, setUserInfo, clearUserInfo} = userStore.actions;

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        //1.发送异步请求
        const res = await loginAPI(loginForm);
        //2.提交同步action进行token的存入
        dispatch(setToken(res.data.token));
    }
}

//获取用户个人信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI();
        dispatch( setUserInfo(res.data))
    }
}
export {setToken, fetchLogin, setUserInfo, fetchUserInfo, clearUserInfo}
const userReducer = userStore.reducer;
export default userReducer