import {
  HIDE_FOODFORM_POPUP,
  SHOW_FOODFORM_POPUP,
  CHANGE_FOOD_CATEGORY,
} from '../actions/types';

export default (
  state = { isVisible: false, category: 'breakfast' },
  action
) => {
  switch (action.type) {
    case HIDE_FOODFORM_POPUP:
      return { ...state, isVisible: false };
    case SHOW_FOODFORM_POPUP:
      return { ...state, isVisible: true, category: action.payload };
    case CHANGE_FOOD_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};
