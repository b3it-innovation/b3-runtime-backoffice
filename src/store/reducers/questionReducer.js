import * as actionTypes from '../actions/actionTypes';

const initState = {
    fetchedQuestions: [],
    categories: [],
    questionAdded: false,
    questionDeleted: false,
    loading: false,
    error: null
}

const questionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION_INIT:
            return {
                ...state,
                loading: false,
                questionAdded: false,
                questionDeleted: false
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
        case actionTypes.SEARCH_QUESTIONS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SEARCH_QUESTIONS_SUCCESS:
            let questionArray = [];
            action.fetchedQuestions.forEach(q => {
                questionArray.push({
                    id: q.id, category: q.data().category, correctAnswer: q.data().correctAnswer,
                    text: q.data().text, title: q.data().title, options: q.data().options
                });
            });
            return {
                ...state,
                loading: false,
                error: null,
                fetchedQuestions: questionArray
            };
        case actionTypes.SEARCH_QUESTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.DELETE_QUESTION_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.DELETE_QUESTION_SUCCESS:
            let copy = [...state.fetchedQuestions];
            const newValue = copy.filter(q => q.id !== action.id)
            return {
                ...state,
                loading: false,
                error: null,
                questionDeleted: true,
                fetchedQuestions: newValue
            }
        case actionTypes.DELETE_QUESTION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
};

export default questionReducer;