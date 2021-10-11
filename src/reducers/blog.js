import { blogConstants } from "../actions/constants";

const initialState = {
    blogs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case blogConstants.GET_ALL_BLOG_SUCCESS:
            state = {
                ...state,
                blogs: action.payload.blogs
            }
            break;
    }
    return state;
}