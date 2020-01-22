import * as actionTypes from './actionTypes'
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

export const addQuestionInit = () => {
    return {
        type: actionTypes.ADD_QUESTION_INIT
    }
}; 

export const addQuestionStart = () => {
    return {
        type: actionTypes.ADD_QUESTION_START
    }
}

export const addQuestion = (payload) => {
    return (dispatch) => {
        dispatch(addQuestionStart());
        firestore.collection('WilliamsTest').doc("test").collection(collectionsNames.QUESTIONS).add(payload)
        .then(() => {
            dispatch({ type: actionTypes.ADD_QUESTION_SUCCESS, payload });
        }).catch((err) => {
            dispatch({ type: actionTypes.ADD_QUESTION_ERROR, err });
        })
    }
};

const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    }
};

export const initCategories = () => {
    return dispatch => {
        const ref = firestore.collection('categories');
        ref.get().then(querySnapshot => {
            dispatch(setCategories(querySnapshot));
        }).catch(error => {
            console.log(error);
        })
    };
};

const searchQuestionsStart = () => {
    return {
        type: actionTypes.SEARCH_QUESTIONS_START,
    }
};

const searchQuestionsSuccess = (questions) => {
    return {
        type: actionTypes.SEARCH_QUESTIONS_SUCCESS,
        fetchedQuestions: questions,
    }
};

const searchQuestionsError = (err) => {
    return {
        type: actionTypes.SEARCH_QUESTIONS_ERROR,
        error: err
    }
};

export const searchQuestions = (category) => {
    return (dispatch) => {
        dispatch(searchQuestionsStart());
        firestore.collection('WilliamsTest').doc("test").collection(collectionsNames.QUESTIONS)
        .where('category', '==', category).get()
        .then((response) => {
            dispatch(searchQuestionsSuccess(response));
        }).catch((err) => {
            dispatch(searchQuestionsError(err));
        })
    }
};

export const deleteQuestion = (questionId) => {
    return (dispatch) => {
        dispatch(deleteQuestionStart());
        firestore.collection('WilliamsTest').doc("test").collection(collectionsNames.QUESTIONS).doc(questionId).delete()
        .then(() => {
            dispatch(deleteQuestionSuccess(questionId));
        }).catch((err) => {
            dispatch(deleteQuestionError(err));
        });
    }
}

const deleteQuestionStart = () => {
    return {
        type: actionTypes.DELETE_QUESTION_START
    }
}

const deleteQuestionSuccess = (id) => {
    return {
        type: actionTypes.DELETE_QUESTION_SUCCESS,
        id: id
    }
}

const deleteQuestionError = (error) => {
    return {
        type: actionTypes.DELETE_QUESTION_ERROR,
        error: error
    }
}