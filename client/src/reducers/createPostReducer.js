import { CREATE_POST, UPDATE_POST, DELETE_POST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_POST:
      return action.payload;
    case UPDATE_POST:
      return action.payload;
    case DELETE_POST:
      return action.payload;
    default:
      return state;
  }
};
