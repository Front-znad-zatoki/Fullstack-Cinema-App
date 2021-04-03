import { SUCCESS, FAIL } from '../../actions/types';

const reservationReducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      return state;
    case FAIL:
      return state;
    default:
      return state;
  }
};

export default reservationReducer;
