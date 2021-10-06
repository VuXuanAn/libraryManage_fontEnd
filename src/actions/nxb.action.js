import axiosIntance from "../helpers/axios";
import { nxbConstant } from "./constants";

export const getAllNxb = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: nxbConstant.GET_NXB_REQUEST });
            const res = await axiosIntance.get(`/product/getNxb`);
            if (res.status === 200) {
                const { nxb } = res.data;
                dispatch({
                    type: nxbConstant.GET_NXB_SUCCESS,
                    payload: { nxb }
                });
            } else {
                dispatch({ type: nxbConstant.GET_NXB_FAIL });
            }
        } catch (error) {
            console.log(error);
        }
    };
}


export const addProduct = (nxb) => {
    return async (dispatch) => {
        dispatch({ type: nxbConstant.CREATE_NXB_REQUEST });
        const res = await axiosIntance.post(`/product/create`, {
            ...nxb
        });

        if (res.status === 201) {
            dispatch({ type: nxbConstant.CREATE_NXB_SUCCESS });
            dispatch(getAllNxb());
        } else {
            if (res.status === 400) {
                dispatch({
                    type: nxbConstant.CREATE_NXB_FAIL,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}


export const deleteNxb = (_id) => {
    return async (dispatch) => {
        dispatch({ type: nxbConstant.DELETE_NXB_REQUEST })
        const res = await axiosIntance.post(`/product/delete`, { _id });
        if (res.status === 201) {
            dispatch({ type: nxbConstant.DELETE_NXB_SUCCESS });
            dispatch(getAllNxb());
        } else {
            if (res.status === 400) {
                dispatch({
                    type: nxbConstant.DELETE_NXB_FAIL,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}