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

export const addCategoryError = (error) => (
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
        firestore.collection(collectionsNames.TRACKS).where('categoryKey', '==', categoryId)
            .get()
            .then((response) => {
                if (response.size === 0) {
                    firestore.collection(collectionsNames.QUESTIONS).where('categoryKey', '==', categoryId)
                        .get()
                        .then((res) => {
                            if (res.size === 0) {
                                firestore.collection(collectionsNames.CATEGORIES).doc(categoryId)
                                    .delete()
                                    .then(() => {
                                        dispatch(deleteCategorySuccess(categoryId));
                                    })
                                    .catch((err) => {
                                        dispatch(deleteCategoryError(err));
                                    });
                            } else {
                                const err = { message: 'There are some questions that have this category' };
                                dispatch(deleteCategoryError(err));
                            }
                        })
                        .catch((err) => {
                            dispatch(deleteCategoryError(err));
                        });
                } else {
                    const err = { message: 'There are some tracks that have this category' };
                    dispatch(deleteCategoryError(err));
                }
            })
            .catch((err) => {
                dispatch(deleteCategoryError(err));
            });
    }
);

const updateCategorySuccess = (id, name) => (
    {
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        updatedId: id,
        updatedName: name,
    }
);

const updateCategoryError = (error) => (
    {
        type: actionTypes.UPDATE_CATEGORY_ERROR,
        err: error,
    }
);

export const updateCategory = (id, newName) => (
    (dispatch) => {
        dispatch(connectCategoriesStart());
        firestore.collection(collectionsNames.CATEGORIES).doc(id)
            .update({ name: newName })
            .then(() => {
                dispatch(updateCategorySuccess(id, newName));
            })
            .catch((err) => {
                dispatch(updateCategoryError(err));
            });
    }
);

export const resetCategoryError = () => (
    {
        type: actionTypes.RESET_CATEGORY_ERROR,
    }
);
