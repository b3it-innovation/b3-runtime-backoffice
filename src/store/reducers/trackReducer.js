import * as actionTypes from '../actions/actionTypes';

const initState = {
    tracks: null,
    loading: false,
    error: null,
};

const connectTracksStart = (state) => ({
    ...state,
    loading: true,
    error: null,
});

const fetchTracksSuccess = (state, action) => {
    const tracks = [];
    action.fetchedTracks.forEach((t) => {
        tracks.push({
            id: t.id, name: t.data().name, category: t.data().category,
        });
    });
    return {
        ...state,
        loading: false,
        error: null,
        tracks,
    };
};

const fetchTracksError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

const addTrackSuccess = (state) => ({
    ...state,
    loading: false,
    error: null,
});

const addTrackError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

const deleteTrackSuccess = (state) => ({
    ...state,
    loading: false,
    error: null,
});

const deleteTrackError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

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
    }
};

export default trackReducer;
