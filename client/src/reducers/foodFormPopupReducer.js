import {
  HIDE_FOODFORM_POPUP,
  SHOW_FOODFORM_POPUP_ADD,
  SHOW_FOODFORM_POPUP_UPDATE,
  CHANGE_FOOD_CATEGORY,
  UPDATE_PRODUCT_NAME,
  UPDATE_PRODUCT_KCAL,
  UPDATE_PRODUCT_QUANTITY,
} from '../actions/types';

export default (
  state = {
    isVisible: false,
    category: '',
    product: '',
    kcal: 0,
    quantity: 0,
    action: '',
    itemId: null,
  },
  action
) => {
  switch (action.type) {
    case HIDE_FOODFORM_POPUP:
      return {
        ...state,
        isVisible: false,
        category: '',
        product: '',
        kcal: 0,
        quantity: 0,
        itemId: null,
      };
    case SHOW_FOODFORM_POPUP_ADD:
      return {
        ...state,
        isVisible: true,
        category: action.payload.category,
        action: action.payload.action,
      };
    case SHOW_FOODFORM_POPUP_UPDATE:
      const { product, kcal, quantity, _id } = action.payload.item;
      return {
        ...state,
        isVisible: true,
        category: action.payload.category,
        product,
        kcal,
        quantity,
        action: action.payload.action,
        itemId: _id,
      };
    case CHANGE_FOOD_CATEGORY:
      return { ...state, category: action.payload };
    case UPDATE_PRODUCT_NAME:
      return { ...state, product: action.payload };
    case UPDATE_PRODUCT_KCAL:
      return { ...state, kcal: action.payload };
    case UPDATE_PRODUCT_QUANTITY:
      return { ...state, quantity: action.payload };
    default:
      return state;
  }
};
