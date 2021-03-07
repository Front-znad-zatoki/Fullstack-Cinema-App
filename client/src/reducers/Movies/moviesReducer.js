const moviesReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      console.log('adding', action.payload);
      return state;
    case 'FAIL':
      console.log('deleting', action.payload);
      return state;
    default:
      console.log('default');
      return state;
  }
};

export default moviesReducer;
