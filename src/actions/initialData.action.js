import {
    bookConstant,
    nxbConstant,
    authConstants,
    ticketBorrowedConstant,
    categoryConstants,
    blogConstants,
    medical
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
    return async (dispatch) => {
        const res = await axios.post(`/initialData`);
        if (res.status === 200) {
            const { nxb, book, users, tickets, categories, blogs, profiles } = res.data;
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
            dispatch({
                type: ticketBorrowedConstant.GET_ALL_TICKET_SUCCESS,
                payload: { tickets }
            })
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories }
            })
            dispatch({
                type: blogConstants.GET_ALL_BLOG_SUCCESS,
                payload: { blogs }
            })
            dispatch({
                type: medical.GET_ALL_PROFILE_SUCCESS,
                payload: { profiles }
            })
        }
        console.log(res);
    };
};