import { medical } from "../actions/constants";

const initialState = {
    profiles: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case medical.GET_ALL_PROFILE_SUCCESS:
            state = {
                ...state,
                profiles: action.payload.profiles
            }
            break;
    }

    return state;
}