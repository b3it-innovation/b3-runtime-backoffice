import * as actionTypes from '../actions/actionTypes';

const initState = {
    tracks: null,
    loading: false,
    error: null
};

const connectTracksStart = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null
    };
};

const fetchTracksSuccess = (state, action) => {
    let tracks = [];
    action.fetchedTracks.forEach(t => {
        tracks.push({
            id: t.id, name: t.data().name, category: t.data().category,
        });
    });
    return {
        ...state,
        loading: false,
        error: null,
        tracks: tracks
    };
};

const fetchTracksError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const addTrackSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null
    };
};

const addTrackError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const deleteTrackSuccess = (state, action) => {
    console.log("deleted id:", action.deletedId);
    return {
        ...state,
        loading: false,
        error: null
    };
};

const deleteTrackError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const trackReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_TRACKS_START:
            return connectTracksStart(state, action);
        case actionTypes.FETCH_TRACKS_SUCCESS:
            return fetchTracksSuccess(state, action);
        case actionTypes.FETCH_TRACKS_ERROR:
            return fetchTracksError(state, action);
        case actionTypes.ADD_TRACK_SUCCESS:
            return addTrackSuccess(state, action);
        case actionTypes.ADD_TRACK_ERROR:
            return addTrackError(state, action);
        case actionTypes.DELETE_TRACK_SUCCESS:
            return deleteTrackSuccess(state, action);
        case actionTypes.DELETE_TRACK_ERROR:
            return deleteTrackError(state, action);
        default:
            return state;
    };
};

export default trackReducer;