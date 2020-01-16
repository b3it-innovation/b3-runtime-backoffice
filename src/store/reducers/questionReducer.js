const initState = {
    questions: [],
  }
  
  const questionReducer = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_QUESTION_SUCCESS':
        console.log('add question success');
        return state;
      case 'ADD_QUESTION_ERROR':
        console.log('add question error', action.err);
        return state;
      default:
        return state;
    }
  };
  
  export default questionReducer;