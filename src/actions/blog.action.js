import axios from "../helpers/axios";
import { blogConstants } from "./constants"
import { message } from 'antd';
export const createBlog = (blog) => {
    return async (dispatch) => {
        dispatch({
            type: blogConstants.CREATE_BLOG_REQUEST
        })
        const res = await axios.post('/blog/create', blog)
        if (res.status === 201) {

            await dispatch({
                type: blogConstants.CREATE_BLOG_SUCCESS
            })
            await dispatch(getAllBlogs())
            message.info('Tạo bài viết mới thành công');
        }

    }
}

export const getAllBlogs = () => {
    return async (dispatch) => {
        dispatch({
            type: blogConstants.GET_ALL_BLOG_REQUEST
        })
        const res = await axios.get('/blog/getAllBlog')
        if (res.status === 200) {
            const { blogs } = res.data
            dispatch({
                type: blogConstants.GET_ALL_BLOG_SUCCESS,
                payload: { blogs }
            })
        }
    }
}

