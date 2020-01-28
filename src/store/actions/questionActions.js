import * as actionTypes from './actionTypes';
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

export const addQuestionInit = () => ({
    type: actionTypes.ADD_QUESTION_INIT,
});

export const connectQuestionsStart = () => ({
    type: actionTypes.CONNECT_QUESTIONS_START,
});

export const addQuestion = (payload) => (dispatch) => {
    dispatch(connectQuestionsStart());
    firestore.collection('WilliamsTest').doc('test').collection(collectionsNames.QUESTIONS).add(payload)
        .then(() => {
            dispatch({ type: actionTypes.ADD_QUESTION_SUCCESS, payload });
        })
        .catch((err) => {
            dispatch({ type: actionTypes.ADD_QUESTION_ERROR, err });
        });
};

const searchQuestionsSuccess = (questions) => ({
    type: actionTypes.SEARCH_QUESTIONS_SUCCESS,
    fetchedQuestions: questions,
});

const searchQuestionsError = (err) => ({
    type: actionTypes.SEARCH_QUESTIONS_ERROR,
    error: err,
});

export const searchQuestions = (category) => (dispatch) => {
    dispatch(connectQuestionsStart());
    firestore.collection('WilliamsTest').doc('test').collection(collectionsNames.QUESTIONS)
        .where('category', '==', category)
        .get()
        .then((response) => {
            dispatch(searchQuestionsSuccess(response));
        })
        .catch((err) => {
            dispatch(searchQuestionsError(err));
        });
};

const deleteQuestionSuccess = (id) => ({
    type: actionTypes.DELETE_QUESTION_SUCCESS,
    id,
});

const deleteQuestionError = (error) => ({
    type: actionTypes.DELETE_QUESTION_ERROR,
    error,
});

export const deleteQuestion = (questionId) => (dispatch) => {
    dispatch(connectQuestionsStart());
    firestore.collection('WilliamsTest').doc('test').collection(collectionsNames.QUESTIONS).doc(questionId)
        .delete()
        .then(() => {
            dispatch(deleteQuestionSuccess(questionId));
        })
        .catch((err) => {
            dispatch(deleteQuestionError(err));
        });
};
