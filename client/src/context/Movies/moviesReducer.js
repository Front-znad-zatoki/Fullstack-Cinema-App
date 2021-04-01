import { SUCCESS, FAIL } from '../../actions/types';

const moviesReducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      // console.log('success', action.payload);
      return state;
    case FAIL:
      // console.log('fail', action.payload);
      return state;
    default:
      // console.log('default');
      return state;
  }
};

export default moviesReducer;
