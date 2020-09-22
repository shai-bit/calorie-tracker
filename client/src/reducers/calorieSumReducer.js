import { CALORIE_SUM } from '../actions/types';

export default (
  state = { breakfast: 0, lunch: 0, dinner: 0, snacks: 0 },
  action
) => {
  switch (action.type) {
    case CALORIE_SUM:
      const { breakfast, lunch, dinner, snacks } = action.payload;
      return { ...state, breakfast, lunch, dinner, snacks };
    default:
      return state;
  }
};
