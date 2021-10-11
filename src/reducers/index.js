
import { combineReducers } from 'redux';
import auth from './auth'
import nxb from './nxb'
import book from './book'
import user from './user'
import tickets from './ticketBorrowed'
import categories from './category'
import blogs from './blog'
const rootReducer = combineReducers({
    auth,
    nxb,
    book,
    user,
    tickets,
    categories,
    blogs
});

export default rootReducer;