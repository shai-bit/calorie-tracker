import { UPDATE_GOAL } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case UPDATE_GOAL:
      return action.payload;
    default:
      return state;
  }
};
