import * as actionTypes from '../actions/actionTypes';

const initState = {
    questions: [],
    categories: [],
    questionAdded: false,
    loading: false,
    error: null
}

const questionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION_INIT:
            return {
                ...state,
                loading: false,
                questionAdded: false
            };
        case actionTypes.ADD_QUESTION_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_QUESTION_SUCCESS:
            console.log('add question success');
            return {
                ...state,
                questionAdded: true,
                loading: false,
                error: null
            };
        case actionTypes.ADD_QUESTION_ERROR:
            console.log('add question error', action.err);
            return {
                ...state,
                loading: false,
                error: action.err
            };
        case actionTypes.SET_CATEGORIES:
            let catArray = [];
            action.categories.forEach(element => {
                catArray.push({ id: element.id, name: element.data() });
            });
            return {
                ...state,
                categories: catArray
            };
        default:
            return state;
    }
};

export default questionReducer;