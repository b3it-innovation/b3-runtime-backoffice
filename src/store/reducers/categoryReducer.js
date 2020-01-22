import * as actionTypes from '../actions/actionTypes';

const initState = {
    categories: [],
    loading: false,
    error: null
}

const connectCategoriesStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const fetchCategoriesSuccess = (state, action) => {
    let categories = [];
    action.fetchedCategories.forEach(element => {
        categories.push({ id: element.id, name: element.data().name });
    });
    return {
        ...state,
        categories: categories,
        loading: false,
        error: null
    };
};

const fetchCategoriesError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null
    };
};

const addCategorySuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null
    };
};

const addCategoryError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const deleteCategorySuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null
    };
};

const deleteCategoryError = (state, action) => {
    console.log("deleted id: ", action.deletedId);
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_CATEGORIES_START:
            return connectCategoriesStart();
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
            return fetchCategoriesSuccess(state, action);
        case actionTypes.FETCH_CATEGORIES_ERROR:
            return fetchCategoriesError(state, action);
        case actionTypes.ADD_CATEGORY_SUCCESS:
            return addCategorySuccess(state, action);
        case actionTypes.ADD_CATEGORY_ERROR:
            return addCategoryError(state, action);
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return deleteCategorySuccess(state, action);
        case actionTypes.DELETE_CATEGORY_ERROR:
            return deleteCategoryError(state, action);
        default:
            return state;
    }
};

export default categoryReducer;