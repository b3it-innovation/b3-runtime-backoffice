export const addQuestion = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('WilliamsTest').add({
            test: 'testText',
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_QUESTION_SUCCESS', payload });
        }).catch((err) => {
            dispatch({ type: 'ADD_QUESTION_ERROR', err });
        })
    }
};