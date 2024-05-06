import { publicRequest, userRequest } from "../requestmethods";
import { getproductFailure, getproductSuccess, getproductStart, deleteproductStart, deleteproductSuccess, deleteproductFailure, updateproductStart, updateproductSuccess, updateproductFailure, addproductFailure, addproductSuccess, addproductStart } from "./productredux";
import { loginFalilure, loginStart, loginSuccess } from "./userRedux";

export const    login = async (dispatch, users) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", users);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFalilure());
    }
}

export const getproducts = async (dispatch) => {
    dispatch(getproductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getproductSuccess(res.data));
    } catch (err) {
        dispatch(getproductFailure());
    }
}

export const   deleteproducts = async (id, dispatch) => {
    dispatch(deleteproductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteproductSuccess(id));
;
    } catch (err) {
        dispatch(deleteproductFailure());
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateproductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product); // Changed post to put
        dispatch(updateproductSuccess({ id, product }));
    } catch (err) {
        dispatch(updateproductFailure());
    }
}

// ADD
export const addProduct = async (product, dispatch) => {
    dispatch(addproductStart());
    try {
        const res = await userRequest.post(`/products`, product); // Removed unnecessary object wrapping
        dispatch(addproductSuccess(res.data));
    } catch (err) {
        dispatch(addproductFailure());
    }
}
