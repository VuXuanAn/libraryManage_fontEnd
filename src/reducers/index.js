
import { combineReducers } from 'redux';
import auth from './auth'
import nxb from './nxb'
import book from './book'
import user from './user'
const rootReducer = combineReducers({
    auth,
    nxb,
    book,
    user
});

export default rootReducer;