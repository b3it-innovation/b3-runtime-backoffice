import * as actionTypes from './actionTypes'
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectCategoriesStart = () => {
    return {
        type: actionTypes.CONNECT_CATEGORIES_START
    };
};

const fetchCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        fetchedCategories: categories
    };
};

const fetchCategoriesError = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_ERROR,
        error: error
    };
};

export const fetchCategories = () => {
    return dispatch => {
        firestore.collection(collectionsNames.CATEGORIES).orderBy('name').get()
            .then(querySnapshot => {
                dispatch(connectCategoriesStart());
                dispatch(fetchCategoriesSuccess(querySnapshot));
            }).catch(error => {
                dispatch(fetchCategoriesError(error));
            });
    };
};

const addCategorySuccess = () => {
    return {
        type: actionTypes.ADD_CATEGORY_SUCCESS
    };
};

const addCategoryError = (error) => {
    return {
        type: actionTypes.ADD_CATEGORY_ERROR,
        error: error
    };
};

export const addCategory = (newCategory) => {
    return dispatch => {
        dispatch(connectCategoriesStart());
        firestore.collection(collectionsNames.CATEGORIES).add(newCategory)
            .then(() => {
                dispatch(addCategorySuccess());
                dispatch(fetchCategories());
            }).catch((err) => {
                dispatch(addCategoryError(err));
            });
    };
};

const deleteCategorySuccess = (id) => {
    return {
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        deletedId: id
    };
};

const deleteCategoryError = (error) => {
    return {
        type: actionTypes.DELETE_CATEGORY_ERROR,
        error: error
    };
};

export const deleteCategory = (categoryId) => {
    return (dispatch) => {
        dispatch(connectCategoriesStart());
        firestore.collection(collectionsNames.CATEGORIES).doc(categoryId).delete()
            .then(() => {
                dispatch(deleteCategorySuccess(categoryId));
            }).catch((err) => {
                dispatch(deleteCategoryError(err));
            });
    };
};