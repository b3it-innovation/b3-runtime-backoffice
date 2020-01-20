import * as actionTypes from './actionTypes'
import { firestore } from './../../config/fbConfig';

export const addQuestionInit = () => {
    return {
        type: actionTypes.ADD_QUESTION_INIT
    }
}; 

export const addQuestion = (payload) => {
    return (dispatch) => {
        firestore.collection('WilliamsTest').add(payload)
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