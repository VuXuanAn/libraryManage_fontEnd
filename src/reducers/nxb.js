import { nxbConstant } from "../actions/constants";

const initialState = {
    nxb: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case nxbConstant.GET_NXB_SUCCESS:
            state = {
                ...state,
                nxb: action.payload.nxb
            }
            break;
    }

    return state;
}