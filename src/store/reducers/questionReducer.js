import * as actionTypes from '../actions/actionTypes';

const initState = {
    fetchedQuestions: [],
    questionAdded: false,
    questionDeleted: false,
    loading: false,
    error: null,
};

const addQuestionInit = (state) => ({
    ...state,
    loading: false,
    questionAdded: false,
    questionDeleted: false,
});

const connectQuestionsStart = (state) => ({
    ...state,
    loading: true,
});

const addQuestionSuccess = (state) => ({
    ...state,
    questionAdded: true,
    loading: false,
    error: null,
});

const addQuestionError = (state, action) => ({
    ...state,
    loading: false,
    error: action.err,
});

const searchQuestionsSuccess = (state, action) => {
    const questionArray = [];
    action.fetchedQuestions.forEach((q) => {
        questionArray.push({
            id: q.id,
            category: q.data().category,
            correctAnswer: q.data().correctAnswer,
            text: q.data().text,
            title: q.data().title,
            options: q.data().options,
        });
    });
    return {
        ...state,
        loading: false,
        error: null,
        fetchedQuestions: questionArray,
    };
};

const searchQuestionError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

const deleteQuestionSuccess = (state, action) => {
    const newValue = state.fetchedQuestions.filter((q) => q.id !== action.id);
    return {
        ...state,
        loading: false,
        error: null,
        questionDeleted: true,
        fetchedQuestions: newValue,
    };
};

const deleteQuestionError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

const questionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION_INIT:
            return addQuestionInit(state, action);
        case actionTypes.CONNECT_QUESTIONS_START:
            return connectQuestionsStart(state, action);
        case actionTypes.ADD_QUESTION_SUCCESS:
            return addQuestionSuccess(state, action);
        case actionTypes.ADD_QUESTION_ERROR:
            return addQuestionError(state, action);
        case actionTypes.SEARCH_QUESTIONS_SUCCESS:
            return searchQuestionsSuccess(state, action);
        case actionTypes.SEARCH_QUESTIONS_ERROR:
            return searchQuestionError(state, action);
        case actionTypes.DELETE_QUESTION_SUCCESS:
            return deleteQuestionSuccess(state, action);
        case actionTypes.DELETE_QUESTION_ERROR:
            return deleteQuestionError(state, action);
        default:
            return state;
    }
};

export default questionReducer;
