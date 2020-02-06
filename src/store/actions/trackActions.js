import * as actionTypes from './actionTypes';
import { firestore, fieldPath, fieldValue } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectTracksStart = () => ({
    type: actionTypes.CONNECT_TRACKS_START,
});

const fetchTracksSuccess = (tracks) => ({
    type: actionTypes.FETCH_TRACKS_SUCCESS,
    fetchedTracks: tracks,
});

const fetchTracksError = (error) => ({
    type: actionTypes.FETCH_TRACKS_ERROR,
    error,
});

export const fetchTracks = () => (dispatch) => {
    dispatch(connectTracksStart());
    firestore.collection(collectionsNames.TRACKS).get()
        .then((response) => {
            dispatch(fetchTracksSuccess(response));
        })
        .catch((err) => {
            dispatch(fetchTracksError(err));
        });
};

export const searchTracksByKeys = (trackKeys) => (dispatch) => {
    dispatch(connectTracksStart());
    firestore.collection(collectionsNames.TRACKS)
        .where(fieldPath.documentId(), 'in', trackKeys).get()
        .then((response) => {
            dispatch(fetchTracksSuccess(response));
        })
        .catch((err) => {
            dispatch(fetchTracksError(err));
        });
};

const addTrackSuccess = () => ({
    type: actionTypes.ADD_TRACK_SUCCESS,
});

const addTrackError = (error) => ({
    type: actionTypes.ADD_TRACK_ERROR,
    error,
});

export const addTrack = (newTrack, checkpoints) => (dispatch) => {
    dispatch(connectTracksStart());

    const trackRef = firestore.collection(collectionsNames.TRACKS).doc();
    const checkpointRef = [];
    checkpoints.forEach((checkpoint) => {
        const ref = trackRef.collection(collectionsNames.CHECKPOINTS).doc();
        checkpointRef.push(ref);
    });

    return firestore.runTransaction((transaction) => transaction.get(trackRef)
        .then((trackDoc) => {
            transaction.set(trackRef, newTrack);
            checkpointRef.forEach((ref, index) => {
                transaction.set(ref, checkpoints[index]);
            });
        }).catch((err) => {
            dispatch(addTrackError(err));
        })).then(() => {
        dispatch(addTrackSuccess());
    }).catch((err) => {
        dispatch(addTrackError(err));
    });
};

const deleteTrackSuccess = (id) => ({
    type: actionTypes.DELETE_TRACK_SUCCESS,
    deletedId: id,
});

const deleteTrackError = (error) => ({
    type: actionTypes.DELETE_COMPETITION_ERROR,
    error,
});

// TODO: DO TEST
export const deleteTrack = (trackId) => (dispatch) => {
    dispatch(connectTracksStart());

    firestore.collection(collectionsNames.COMPETITIONS)
        .where('trackKeys', 'array-contains', trackId).get()
        .then((response) => {
            const docRefs = [];
            response.forEach((doc) => {
                docRefs.push(doc);
            });
            return firestore.runTransaction((transaction) => {
                const promises = docRefs.map((doc) => new Promise((doc) => transaction.get(doc)));
                const transactions = Promise.all(promises);
                transactions.forEach((t) => {
                    t.update({ trackKeys: fieldValue.arrayRemove(trackId) });
                });
            });
        })
        .catch((err) => {
            dispatch(deleteTrackError(err));
        });
    //     firestore.collection(collectionsNames.TRACKS).doc(trackId).delete()
    //         .then(() => {
    //             // fetch all competitions that have deleted track
    //             firestore.collection(collectionsNames.COMPETITIONS)
    //                 .where("trackKeys", "array-contains", trackId).get()
    //                 .then((response) => {
    //                     response.forEach(doc => {
    //                         // loop competitions and delete the track
    //                         firestore.collection(collectionsNames.COMPETITIONS).doc(doc.id)
    //                             .update({ trackKeys: fieldValue.arrayRemove(trackId) })
    //                             .then(() => {

    //                             })
    //                             .catch((err) => {
    //                                 dispatch(deleteTrackError(err));
    //                             });
    //                     })
    //                     dispatch(deleteTrackSuccess(trackId));
    //                 })
    //                 .catch((err) => {
    //                     dispatch(deleteTrackError(err));
    //                 });
    //         }).catch((err) => {
    //             dispatch(deleteTrackError(err));
    //         });
    // };
};
