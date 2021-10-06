import { authConstants } from "../actions/constants";

const initialState = {
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case authConstants.GET_ALL_USER_SUCCESS:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
    }

    return state;
}