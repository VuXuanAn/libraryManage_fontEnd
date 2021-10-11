import axiosIntance from "../helpers/axios"
import { categoryConstants } from "./constants"



export const createCategory = (name) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.CREATE_CATEGORY_REQUEST
        })

        const res = await axiosIntance.post('/category/create', { name })

        if (res.status === 201) {
            await dispatch({
                type: categoryConstants.CREATE_CATEGORY_SUCCESS
            })
            await dispatch(getAllCategory())
        }
        if (res.status === 400) {

        }
    }
}

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST })
        const res = await axiosIntance.get('/category/getAllCategory')
        if (res.status === 200) {
            const { categories } = res.data
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories }
            })
        }
    }
}
