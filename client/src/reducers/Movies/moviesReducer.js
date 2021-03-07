const moviesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('adding', action.payload);
      return state;
    case 'DELETE':
      console.log('deleting', action.payload);
      return state;
    case 'UPDATE':
      console.log('updating', action.payload);
      return state;
    case 'GET_ONE':
      console.log('getting one', action.payload);
      return state;
    default:
      console.log('default');
      return state;
  }
};

export default moviesReducer;
