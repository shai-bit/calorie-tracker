import { MACROS_SUM } from '../actions/types';
import Macros from '../components/Macros';

export default (state = { carbs: 0, fats: 0, protein: 0 }, action) => {
  switch (action.type) {
    case MACROS_SUM:
      const { carbs, fats, protein } = action.payload;
      return { ...state, carbs, fats, protein };
    default:
      return state;
  }
};
