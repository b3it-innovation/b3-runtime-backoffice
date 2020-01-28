import * as actionTypes from './actionTypes';
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectResultsStart = () => ({
    type: actionTypes.CONNECT_RESULTS_START,
});

const fetchResultsSuccess = (results) => ({
    type: actionTypes.FETCH_RESULTS_SUCCESS,
    fetchedResults: results,
});

const fetchResultsError = (error) => ({
    type: actionTypes.FETCH_RESULTS_ERROR,
    error,
});

// eslint-disable-next-line import/prefer-default-export
export const fetchResultsByTrackKey = (trackKey) => (dispatch) => {
    dispatch(connectResultsStart());
    firestore.collection(collectionsNames.RESULTS)
        .where('attendee.trackKey', '==', trackKey).orderBy('totalTime').get()
        .then((response) => {
            dispatch(fetchResultsSuccess(response));
        })
        .catch((err) => {
            dispatch(fetchResultsError(err));
        });
};
