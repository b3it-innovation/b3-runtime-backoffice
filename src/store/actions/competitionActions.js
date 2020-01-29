import * as actionTypes from './actionTypes';
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectCompetitionsStart = () => ({
    type: actionTypes.CONNECT_COMPETITONS_START,
});

const fetchCompetitionsSuccess = (competitions) => ({
    type: actionTypes.FETCH_COMPETITONS_SUCCESS,
    fetchedCompetitions: competitions,
});

const fetchCompetitionsError = (error) => ({
    type: actionTypes.FETCH_COMPETITONS_ERROR,
    error,
});

export const fetchCompetitions = () => (dispatch) => {
    dispatch(connectCompetitionsStart());
    firestore.collection(collectionsNames.COMPETITIONS)
        .get()
        .then((response) => {
            dispatch(fetchCompetitionsSuccess(response));
        }).catch((err) => {
            dispatch(fetchCompetitionsError(err));
        });
};

export const fetchCompetitionsByActive = (active) => (dispatch) => {
    if (active === 'all') {
        dispatch(fetchCompetitions());
    } else {
        const isActive = active === 'active';
        dispatch(connectCompetitionsStart());
        firestore.collection(collectionsNames.COMPETITIONS)
            .where('active', '==', isActive).get()
            .then((response) => {
                dispatch(fetchCompetitionsSuccess(response));
            })
            .catch((err) => {
                dispatch(fetchCompetitionsError(err));
            });
    }
};

const addCompetitionSuccess = () => ({
    type: actionTypes.ADD_COMPETITION_SUCCESS,
});

const addCompetitionError = (error) => ({
    type: actionTypes.ADD_COMPETITION_ERROR,
    error,
});

export const addCompetition = (newCompetition) => (dispatch) => {
    dispatch(connectCompetitionsStart());
    firestore.collection(collectionsNames.COMPETITIONS).add(newCompetition)
        .then(() => {
            dispatch(addCompetitionSuccess());
        }).catch((err) => {
            dispatch(addCompetitionError(err));
        });
};

const deleteCompetitionSuccess = (id) => ({
    type: actionTypes.DELETE_COMPETITION_SUCCESS,
    deletedId: id,
});

const deleteCompetitionError = (error) => ({
    type: actionTypes.DELETE_COMPETITION_ERROR,
    error,
});

export const deleteCompetition = (competitionId) => (dispatch) => {
    dispatch(connectCompetitionsStart());
    firestore.collection(collectionsNames.COMPETITIONS).doc(competitionId).delete()
        .then(() => {
            dispatch(deleteCompetitionSuccess(competitionId));
        })
        .catch((err) => {
            dispatch(deleteCompetitionError(err));
        });
};
