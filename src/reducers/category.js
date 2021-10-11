import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: []
};



export default (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:

            console.log(action.payload);
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
    }
    return state;
}