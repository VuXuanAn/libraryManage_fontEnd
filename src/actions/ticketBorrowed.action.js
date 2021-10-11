import { ticketBorrowedConstant } from "./constants"
import axiosIntance from "../helpers/axios";


export const createNewTicket = (ticket) => {
    return async (dispatch) => {
        dispatch({
            type: ticketBorrowedConstant.CREATE_NEW_TICKET_BORROWED_REQUEST
        })
        const res = await axiosIntance.post(`/ticketBorrowd/create`, ticket);
        if (res.status === 201) {
            dispatch({
                type: ticketBorrowedConstant.CREATE_NEW_TICKET_BORROWED_SUCCESS
            })
            dispatch(getAllTicket())
        }
        if (res.status === 400) {
            dispatch({
                type: ticketBorrowedConstant.CREATE_NEW_TICKET_BORROWED_FAIL
            })
        }
    }
}

export const getAllTicket = () => {
    return async (dispatch) => {
        dispatch({
            type: ticketBorrowedConstant.GET_ALL_TICKET_REQUEST
        })

        const res = await axiosIntance.get('/ticketBorrowd/getAllTicket')
        if (res.status === 200) {
            const { tickets } = res.data

            dispatch({
                type: ticketBorrowedConstant.GET_ALL_TICKET_SUCCESS,
                payload: { tickets }
            })
        }
    }
}


export const returnBook = (id) => {
    return async (dispatch) => {
        dispatch({
            type: ticketBorrowedConstant.RETURN_BOOK_REQUEST
        })

        const res = await axiosIntance.post('/ticketBorrowd/return', { id })
        if (res.status === 200) {
            await dispatch({
                type: ticketBorrowedConstant.RETURN_BOOK_SUCCESS
            })
            await dispatch(getAllTicket())
        }
        if (res.status === 400) {
            await dispatch({
                type: ticketBorrowedConstant.RETURN_BOOK_FAIL
            })
        }
    }
}