import * as actionTypes from '../actions/actionTypes';

const initState = {
    results: null,
    loading: false,
    error: null
};

const connectResultsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const fetchResultsSuccess = (state, action) => {
    let results = [];
    action.fetchedResults.forEach(r => {
        results.push({
            id: r.id, lastUpdatedDate: r.data().lastUpdatedDate, key: r.data().key,
            attendee: r.data().attendee, results: r.data().results,
            totalTime: r.data().totalTime
        });
    });
    return {
        ...state,
        loading: false,
        error: null,
        results: results
    };
};

const fetchResultsError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const resultReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_RESULTS_START:
            return connectResultsStart(state, action);
        case actionTypes.FETCH_RESULTS_SUCCESS:
            return fetchResultsSuccess(state, action);
        case actionTypes.FETCH_RESULTS_ERROR:
            return fetchResultsError(state, action);
        default:
            return state;
    };
};

export default resultReducer;