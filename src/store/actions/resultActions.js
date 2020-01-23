import * as actionTypes from './actionTypes'
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectResultsStart = () => {
    return {
        type: actionTypes.CONNECT_RESULTS_START
    };
};

const fetchResultsSuccess = (results) => {
    return {
        type: actionTypes.FETCH_RESULTS_SUCCESS,
        fetchedResults: results
    };
};

const fetchResultsError = (error) => {
    return {
        type: actionTypes.FETCH_RESULTS_ERROR,
        error: error
    };
};

export const fetchResultsByTrackKey = (trackKey) => {
    return dispatch => {
        dispatch(connectResultsStart());
        firestore.collection(collectionsNames.RESULTS)
            .where("attendee.trackKey", "==", trackKey).orderBy('totalTime').get()
            .then((response) => {
                dispatch(fetchResultsSuccess(response));
            }).catch((err) => {
                dispatch(fetchResultsError(err));
            });
    };
};

