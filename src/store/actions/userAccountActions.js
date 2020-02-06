import * as actionTypes from './actionTypes';
import { firestore, fieldPath } from '../../firestore/firestore';
import * as collectionsNames from '../../firestore/collectionNames';

const connectUserAccountsStart = () => ({
    type: actionTypes.CONNECT_USER_ACCOUNTS_START,
});

const fetchUserAccountSuccess = (result) => ({
    type: actionTypes.FETCH_USER_ACCOUNT_SUCCESS,
    fetchedUserAccount: result,
});

const fetchUserAccountError = (error) => ({
    type: actionTypes.FETCH_USER_ACCOUNT_ERROR,
    error,
});

// eslint-disable-next-line import/prefer-default-export
export const fetchUserAccountById = (id) => (dispatch) => {
    dispatch(connectUserAccountsStart());
    firestore.collection(collectionsNames.USER_ACCOUNTS)
        .where(fieldPath.documentId(), '==', id).get()
        .then((response) => {
            dispatch(fetchUserAccountSuccess(response));
        })
        .catch((err) => {
            dispatch(fetchUserAccountError(err));
        });
};
