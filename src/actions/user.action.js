import { authConstants } from "./constants";
import axios from "../helpers/axios";

export const login = (user) => {


    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`/admin/signin`, {
            ...user
        });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post(`/admin/signout`);

        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}



// for user 


export const addUser = (user) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.ADD_USER_REQUEST
        })
        const res = await axios.post('/user/signup', user)
        if (res.status === 201) {
            dispatch({
                type: authConstants.ADD_USER_SUCCESS
            })
            dispatch(getAllUser())
        }
        if (res.status === 400) {
            dispatch({
                type: authConstants.ADD_USER_FAIL
            })
        }
    }
}

export const getAllUser = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.GET_ALL_USER_REQUEST
        })
        const res = await axios.get('/user/getAllUser')
        if (res.status === 200) {
            const { users } = res.data
            dispatch({
                type: authConstants.GET_ALL_USER_SUCCESS,
                payload: users
            })
        }
    }
}