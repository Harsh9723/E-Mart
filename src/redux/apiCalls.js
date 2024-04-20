import { publicRequest } from "../requestMethods";
import {   loginFalilure, loginStart, loginSuccess } from "./userRedux"
export const login = async (dispatch, users) => {

    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", users);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(  loginFalilure())
    }
}