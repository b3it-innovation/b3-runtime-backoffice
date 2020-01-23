import * as actionTypes from './actionTypes'
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

export const addQuestionInit = () => {
    return {
        type: actionTypes.ADD_QUESTION_INIT
    }
};

export const connectQuestionsStart = () => {
    return {
        type: actionTypes.CONNECT_QUESTIONS_START
    };
};

export const addQuestion = (payload) => {
    return (dispatch) => {
        dispatch(connectQuestionsStart());
        firestore.collection('WilliamsTest').doc("test").collection(collectionsNames.QUESTIONS).add(payload)
            .then(() => {
                dispatch({ type: actionTypes.ADD_QUESTION_SUCCESS, payload });
            }).catch((err) => {
                dispatch({ type: actionTypes.ADD_QUESTION_ERROR, err });
            });
    };
};

const searchQuestionsSuccess = (questions) => {
    return {
        type: actionTypes.SEARCH_QUESTIONS_SUCCESS,
        fetchedQuestions: questions,
    };
};

const searchQuestionsError = (err) => {
    return {
        type: actionTypes.SEARCH_QUESTIONS_ERROR,
        error: err
    };
};

export const searchQuestions = (category) => {
    return (dispatch) => {
        dispatch(connectQuestionsStart());
        firestore.collection('WilliamsTest').doc("test").collection(collectionsNames.QUESTIONS)
            .where('category', '==', category).get()
            .then((response) => {
                dispatch(searchQuestionsSuccess(response));
            }).catch((err) => {
                dispatch(searchQuestionsError(err));
            });
    };
};

export const deleteQuestion = (questionId) => {
    return (dispatch) => {
        dispatch(connectQuestionsStart());
        firestore.collection('WilliamsTest').doc("test").collection(collectionsNames.QUESTIONS).doc(questionId).delete()
            .then(() => {
                dispatch(deleteQuestionSuccess(questionId));
            }).catch((err) => {
                dispatch(deleteQuestionError(err));
            });
    };
};

const deleteQuestionSuccess = (id) => {
    return {
        type: actionTypes.DELETE_QUESTION_SUCCESS,
        id: id
    };
};

const deleteQuestionError = (error) => {
    return {
        type: actionTypes.DELETE_QUESTION_ERROR,
        error: error
    };
};