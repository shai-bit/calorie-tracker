import { CREATE_POST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_POST:
      return action.payload;
    default:
      return state;
  }
};
