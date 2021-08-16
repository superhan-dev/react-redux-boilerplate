import { combineReducers } from 'redux';

// import { registration } from './registration.reducer';
import { user } from './user.reducer';
// import { alert } from './alert.reducer';
// import { dashboard } from './dashboard.reducer';

const rootReducer = combineReducers({
    // registration,
    user,
    // alert,
    // dashboard,
});

export default rootReducer;