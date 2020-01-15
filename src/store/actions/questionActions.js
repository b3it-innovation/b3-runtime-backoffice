export const addQuestion = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('WilliamsTest').add({
            test: 'testText',
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_QUESTION_SUCCESSFULL', payload });
        }).catch((err) => {
            dispatch({ type: 'ADD_QUESTION_ERROR', err });
        })
    }
};