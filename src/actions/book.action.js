import axios from "../helpers/axios";
import { bookConstant } from "./constants"


export const getAllBook = () => {
    return async (dispatch) => {
        dispatch({
            type: bookConstant.GET_ALL_BOOK_REQUEST
        })
        const res = await axios.post('/book/getAllBook')

        if (res.status === 200) {
            const { book } = res.data
            dispatch({
                type: bookConstant.GET_ALL_BOOK_SUCCESS,
                payload: { book }
            })
        }
        if (res.status === 400) {

        }
    }
}


export const createBook = (book) => {
    return async (dispatch) => {
        dispatch({ type: bookConstant.CREATE_BOOK_REQUEST });
        const res = await axios.post('/book/create', book);
        if (res.status === 201) {
            dispatch({
                type: bookConstant.CREATE_BOOK_SUCCESS
            });
            dispatch(getAllBook());
        }
        if (res.status === 400) {
            dispatch({
                type: bookConstant.CREATE_BOOK_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}

export const deleteBook = (_id) => {
    return async (dispatch) => {
        dispatch({
            type: bookConstant.DELETE_BOOK_REQUEST
        })

        const res = await axios.post('/book/deleteBook', { _id })
        if (res.status === 201) {
            dispatch({
                type: bookConstant.DELETE_BOOK_SUCCESS
            })
            dispatch(getAllBook());
        }
        if (res.status === 400) {
            dispatch({
                type: bookConstant.DELETE_BOOK_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}