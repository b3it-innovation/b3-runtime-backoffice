import * as actionTypes from '../actions/actionTypes';

const initState = {
    categories: null,
    loading: false,
    error: null,
};

const connectCategoriesStart = (state) => (
    {
        ...state,
        loading: true,
    }
);

const fetchCategoriesSuccess = (state, action) => {
    const cats = [];
    action.fetchedCategories.forEach((category) => {
        cats.push({ id: category.id, name: category.data().name });
    });
    return {
        ...state,
        categories: cats,
        loading: false,
        error: null,
    };
};

const fetchCategoriesError = (state, action) => (
    {
        ...state,
        loading: false,
        error: action.err,
    }
);

const addCategorySuccess = (state) => (
    {
        ...state,
        loading: false,
        error: null,
    }
);

const addCategoryError = (state, action) => (
    {
        ...state,
        loading: false,
        error: action.err,
    }
);

const deleteCategorySuccess = (state, action) => {
    const newCategories = state.categories.filter((c) => c.id !== action.deletedId);
    return {
        ...state,
        categories: newCategories,
        loading: false,
        error: null,
    };
};

const deleteCategoryError = (state, action) => (
    {
        ...state,
        loading: false,
        error: action.err,
    }
);

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_CATEGORIES_START:
            return connectCategoriesStart(state, action);
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
