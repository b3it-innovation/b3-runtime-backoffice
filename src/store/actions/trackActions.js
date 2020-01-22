import * as actionTypes from './actionTypes'
import { firestore, fieldPath, fieldValue } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectTracksStart = () => {
    return {
        type: actionTypes.CONNECT_TRACKS_START
    };
};

const fetchTracksSuccess = (tracks) => {
    return {
        type: actionTypes.FETCH_TRACKS_SUCCESS,
        fetchedTracks: tracks
    };
};

const fetchTracksError = (error) => {
    return {
        type: actionTypes.FETCH_TRACKS_ERROR,
        error: error
    };
};

export const searchTracksByKeys = (trackKeys) => {
    return dispatch => {
        dispatch(connectTracksStart());
        firestore.collection(collectionsNames.TRACKS)
            .where(fieldPath.documentId(), "in", trackKeys).get()
            .then((response) => {
                dispatch(fetchTracksSuccess(response));
            }).catch((err) => {
                dispatch(fetchTracksError(err));
            });
    };
};

const addTrackSuccess = () => {
    return {
        type: actionTypes.ADD_TRACK_SUCCESS
    };
};

const addTrackError = (error) => {
    return {
        type: actionTypes.ADD_TRACK_ERROR,
        error: error
    };
};

export const addTrack = (newTrack) => {
    return dispatch => {
        dispatch(connectTracksStart());
        firestore.collection(collectionsNames.TRACKS).add(newTrack)
            .then(() => {
                dispatch(addTrackSuccess());
            }).catch((err) => {
                dispatch(addTrackError(err));
            });
    };
};

const deleteTrackSuccess = (id) => {
    return {
        type: actionTypes.DELETE_TRACK_SUCCESS,
        deletedId: id
    };
};

const deleteTrackError = (error) => {
    return {
        type: actionTypes.DELETE_COMPETITION_ERROR,
        error: error
    };
};

// TODO: DO TEST
export const deleteTrack = (trackId) => {
    return (dispatch) => {
        dispatch(connectTracksStart());

        firestore.collection(collectionsNames.COMPETITIONS)
            .where("trackKeys", "array-contains", trackId).get()
            .then(response => {
                let docRefs = [];
                response.forEach(doc => {
                    docRefs.push(doc);
                });
                return firestore.runTransaction((transaction) => {
                    let promises = docRefs.map(doc => new Promise(doc => transaction.get(doc)));
                    const transactions = Promise.all(promises);
                    transactions.forEach(t => {
                        t.update({ trackKeys: fieldValue.arrayRemove(trackId) });
                    })
                })

            })
            .catch(err => {
                dispatch(deleteTrackError(err));
            })
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
};