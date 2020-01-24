import * as actionTypes from '../actions/actionTypes';

const initState = {
    competitions: null,
    loading: false,
    error: null
};

const connectCompetitionsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const fetchCompetitionsSuccess = (state, action) => {
    let competitions = [];
    action.fetchedCompetitions.forEach(c => {
        competitions.push({
            id: c.id, active: c.data().active, date: c.data().date,
            name: c.data().name, trackKeys: c.data().trackKeys
        });
    });
    return {
        ...state,
        loading: false,
        error: null,
        competitions: competitions
    };
};

const fetchCompetitionsError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const addCompetitionSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null
    };
};

const addCompetitionError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const deleteCompetitionSuccess = (state, action) => {
    let newArray = state.competitions.filter(c => c !== atob.deletedId);
    return {
        ...state,
        competitions: newArray,
        loading: false,
        error: null
    };
};

const deleteCompetitionError = (state, action) => {
    console.log("delete id: ", action.deletedId);
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const competitionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_COMPETITONS_START:
            return connectCompetitionsStart(state, action);
        case actionTypes.FETCH_COMPETITONS_SUCCESS:
            return fetchCompetitionsSuccess(state, action);
        case actionTypes.FETCH_COMPETITONS_ERROR:
            return fetchCompetitionsError(state, action);
        case actionTypes.ADD_COMPETITION_SUCCESS:
            return addCompetitionSuccess(state, action);
        case actionTypes.ADD_COMPETITION_ERROR:
            return addCompetitionError(state, action);
        case actionTypes.DELETE_COMPETITION_SUCCESS:
            return deleteCompetitionSuccess(state, action);
        case actionTypes.DELETE_COMPETITION_ERROR:
            return deleteCompetitionError(state, action);
        default:
            return state;
    };
};

export default competitionReducer;