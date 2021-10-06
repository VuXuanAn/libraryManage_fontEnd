import {
    bookConstant,
    nxbConstant,
    authConstants
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
    return async (dispatch) => {
        const res = await axios.post(`/initialData`);
        if (res.status === 200) {
            const { nxb, book, users } = res.data;
            dispatch({
                type: nxbConstant.GET_NXB_SUCCESS,
                payload: { nxb },
            });
            dispatch({
                type: bookConstant.GET_ALL_BOOK_SUCCESS,
                payload: { book },
            })
            dispatch({
                type: authConstants.GET_ALL_USER_SUCCESS,
                payload: { users }
            })
        }
        console.log(res);
    };
};