import { bookConstant } from "../actions/constants";

const initialState = {
    book: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case bookConstant.GET_ALL_BOOK_SUCCESS:
            state = {
                ...state,
                book: action.payload.book
            }
            break;
    }

    return state;
}