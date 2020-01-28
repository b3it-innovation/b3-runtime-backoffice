import * as actionTypes from './actionTypes';
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectCategoriesStart = () => (
    {
        type: actionTypes.CONNECT_CATEGORIES_START,
    }
);

const fetchCategoriesSuccess = (categories) => (
    {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        fetchedCategories: categories,
    }
);

const fetchCategoriesError = (error) => (
    {
        type: actionTypes.FETCH_CATEGORIES_ERROR,
        err: error,
    }
);

export const fetchCategories = () => (
    (dispatch) => {
        firestore.collection(collectionsNames.CATEGORIES).orderBy('name').get()
            .then((querySnapshot) => {
                dispatch(connectCategoriesStart());
                dispatch(fetchCategoriesSuccess(querySnapshot));
            })
            .catch((err) => {
                dispatch(fetchCategoriesError(err));
            });
    }
);

const addCategorySuccess = () => (
    {
        type: actionTypes.ADD_CATEGORY_SUCCESS,
    }
);

const addCategoryError = (error) => (
    {
        type: actionTypes.ADD_CATEGORY_ERROR,
        err: error,
    }
);

export const addCategory = (newCategory) => (
    (dispatch) => {
        dispatch(connectCategoriesStart());
        firestore.collection(collectionsNames.CATEGORIES).add(newCategory)
            .then(() => {
                dispatch(addCategorySuccess());
                dispatch(fetchCategories());
            }).catch((error) => {
                dispatch(addCategoryError(error));
            });
    }
);

const deleteCategorySuccess = (id) => (
    {
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        deletedId: id,
    }
);

const deleteCategoryError = (error) => (
    {
        type: actionTypes.DELETE_CATEGORY_ERROR,
        err: error,
    }
);

export const deleteCategory = (categoryId) => (
    (dispatch) => {
        dispatch(connectCategoriesStart());
        firestore.collection(collectionsNames.CATEGORIES).doc(categoryId).delete()
            .then(() => {
                dispatch(deleteCategorySuccess(categoryId));
            })
            .catch((err) => {
                dispatch(deleteCategoryError(err));
            });
    }
);
