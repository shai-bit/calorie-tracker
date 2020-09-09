import { LOCAL_SIGNUP } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case LOCAL_SIGNUP:
      return action.payload;
    default:
      return state;
  }
};
