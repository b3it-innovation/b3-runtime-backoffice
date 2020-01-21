import { combineReducers } from 'redux';
import questionReducer from './questionReducer';


const rootReducer = combineReducers({
    questions: questionReducer
})

export default rootReducer;