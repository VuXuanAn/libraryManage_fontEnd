import axiosIntance from "../helpers/axios";
import { medical } from "./constants";
import { message } from 'antd';
export const createNewProfile = (profile) => {
    return async (dispatch) => {
        try {
            dispatch({ type: medical.CREATE_NEW_PROFILE_REQUEST });
            const res = await axiosIntance.post(`/medical/create`, profile);
            if (res.status === 201) {
                await dispatch({
                    type: medical.CREATE_NEW_PROFILE_SUCCESS
                });
                await dispatch(getAllProfile())
                message.success('Thêm thành công !', 3);
            } else {
                dispatch({ type: medical.CREATE_NEW_PROFILE_FAIL });
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export const getAllProfile = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: medical.GET_ALL_PROFILE_REQUEST });
            const res = await axiosIntance.post(`/medical/getAll`);
            if (res.status === 200) {
                const { profiles } = res.data
                dispatch({
                    type: medical.GET_ALL_PROFILE_SUCCESS,
                    payload: { profiles }
                });
            } else {
                dispatch({ type: medical.GET_ALL_PROFILE_FAIL });
            }
        } catch (error) {
            console.log(error);
        }
    };
}
export const deleteProfileById = (_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: medical.DELETE_PROFILE_REQUEST });
            const res = await axiosIntance.post(`/medical/deleteById`, { _id });
            if (res.status === 201) {
                await dispatch({
                    type: medical.DELETE_PROFILE_SUCCESS
                });
                await dispatch(getAllProfile())
                message.success('Xóa thành công !', 3);
            } else {
                dispatch({ type: medical.DELETE_PROFILE_FAIL });
            }
        } catch (error) {
            console.log(error);
        }
    };
}