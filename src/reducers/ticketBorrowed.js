import { ticketBorrowedConstant } from "../actions/constants";

const initialState = {
    tickets: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ticketBorrowedConstant.GET_ALL_TICKET_SUCCESS:
            state = {
                ...state,
                tickets: action.payload.tickets
            }
            break;
    }

    return state;
}