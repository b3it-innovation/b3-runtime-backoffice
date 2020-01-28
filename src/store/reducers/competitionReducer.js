import * as actionTypes from '../actions/actionTypes';

const initState = {
    competitions: null,
    loading: false,
    error: null,
};

const connectCompetitionsStart = (state) => (
    {
        ...state,
        loading: true,
        error: null,
    }
);

const fetchCompetitionsSuccess = (state, action) => {
    const comps = [];
    action.fetchedCompetitions.forEach((c) => {
        comps.push({
            id: c.id,
            active: c.data().active,
            date: c.data().date,
            name: c.data().name,
            trackKeys: c.data().trackKeys,
        });
    });
    return {
        ...state,
        loading: false,
        error: null,
        competitions: comps,
    };
};

const fetchCompetitionsError = (state, action) => (
    {
        ...state,
        loading: false,
        error: action.err,
    }
);

const addCompetitionSuccess = (state) => (
    {
        ...state,
        loading: false,
        error: null,
    }
);

const addCompetitionError = (state, action) => (
    {
        ...state,
        loading: false,
        error: action.err,
    }
);

const deleteCompetitionSuccess = (state) => {
    const newArray = state.competitions.filter((c) => c !== atob.deletedId);
    return {
        ...state,
        competitions: newArray,
        loading: false,
        error: null,
    };
};

const deleteCompetitionError = (state, action) => (
    {
        ...state,
        loading: false,
        error: action.err,
    }
);

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
    }
};

export default competitionReducer;
