import * as actionTypes from '../actions/actionTypes';

const initState = {
    userAccount: null,
    loading: false,
    error: null,
};

const connectUserAccountsStart = (state) => ({
    ...state,
    loading: true,
    error: null,
});

const fetchUserAccountSuccess = (state, action) => {
    let userAccount = null;
    action.fetchedUserAccount.forEach((ua) => {
        userAccount = {
            id: ua.id,
            firstName: ua.data().firstName,
            lastName: ua.data().lastName,
            key: ua.data().key,
            organization: ua.data().organization,
            userNAme: ua.data().userName,
        };
    });
    return {
        ...state,
        loading: false,
        error: null,
        userAccount,
    };
};

const fetchUserAccountError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

const resultReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_USER_ACCOUNTS_START:
            return connectUserAccountsStart(state, action);
        case actionTypes.FETCH_USER_ACCOUNT_SUCCESS:
            return fetchUserAccountSuccess(state, action);
        case actionTypes.FETCH_USER_ACCOUNT_ERROR:
            return fetchUserAccountError(state, action);
        default:
            return state;
    }
};

export default resultReducer;
