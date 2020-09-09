import { LOCAL_LOGIN } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case LOCAL_LOGIN:
      return action.payload;
    default:
      return state;
  }
};
