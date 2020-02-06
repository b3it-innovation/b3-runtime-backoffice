import { combineReducers } from 'redux';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';
import competitionReducer from './competitionReducer';
import trackReducer from './trackReducer';
import resultReducer from './resultReducer';
import userAccountReducer from './userAccountReducer';

const rootReducer = combineReducers({
    questions: questionReducer,
    categories: categoryReducer,
    competitions: competitionReducer,
    tracks: trackReducer,
    results: resultReducer,
    userAccounts: userAccountReducer,
});

export default rootReducer;
