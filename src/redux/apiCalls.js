
import { loginFailure, loginStart, loginSuccess,logOut } from "./userRedux"
import { publicRequest } from "../requestMethod";

export const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("auth/login",user);
        dispatch(loginSuccess(res.data));
    }
    catch(err){
        dispatch(loginFailure());
        alert(err.response.data.message + " Or IF Registered With email then try email and password" );
    }
}

export const loggingOut = async(dispatch)=>{
    dispatch(logOut());
}