import * as actionTypes from './actionTypes'
import { firestore } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectCompetitionsStart = () => {
    return {
        type: actionTypes.CONNECT_COMPETITONS_START
    };
};

const fetchCompetitionsSuccess = (competitions) => {
    return {
        type: actionTypes.FETCH_COMPETITONS_SUCCESS,
        fetchedCompetitions: competitions
    };
};

const fetchCompetitionsError = (error) => {
    return {
        type: actionTypes.FETCH_COMPETITONS_ERROR,
        error: error
    };
};

export const fetchCompetitions = () => {
    return dispatch => {
        dispatch(connectCompetitionsStart());
        firestore.collection(collectionsNames.COMPETITIONS)
        .get()
        .then((response) => {
            dispatch(fetchCompetitionsSuccess(response));
        }).catch((err) => {
            dispatch(fetchCompetitionsError(err));
        });
    };
};

const addCompetitionSuccess = () => {
    return {
        type: actionTypes.ADD_COMPETITION_SUCCESS
    };
};

const addCompetitionError = (error) => {
    return {
        type: actionTypes.ADD_COMPETITION_ERROR,
        error: error
    };
};

export const addCompetition = (newCompetition) => {
    return dispatch => {
        dispatch(connectCompetitionsStart());
        firestore.collection(collectionsNames.COMPETITIONS).add(newCompetition)
            .then(() => {
                dispatch(addCompetitionSuccess());
            }).catch((err) => {
                dispatch(addCompetitionError(err));
            });
    };
};

const deleteCompetitionSuccess = (id) => {
    return {
        type: actionTypes.DELETE_COMPETITION_SUCCESS,
        deletedId: id
    };
};

const deleteCompetitionError = (error) => {
    return {
        type: actionTypes.DELETE_COMPETITION_ERROR,
        error: error
    };
};

export const deleteCompetition = (competitionId) => {
    return (dispatch) => {
        dispatch(connectCompetitionsStart());
        firestore.collection(collectionsNames.COMPETITIONS).doc(competitionId).delete()
        .then(() => {
            dispatch(deleteCompetitionSuccess(competitionId));
        }).catch((err) => {
            dispatch(deleteCompetitionError(err));
        });
    };
};