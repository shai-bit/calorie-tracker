import { SET_DATE } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SET_DATE:
      return action.payload;
    default:
      return state;
  }
};
